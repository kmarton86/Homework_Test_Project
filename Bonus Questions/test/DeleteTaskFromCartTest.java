import org.junit.jupiter.api.*;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.net.URL;
import java.time.Duration;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class DeleteTaskFromCartTest {

    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeEach
    void setUp() throws Exception {
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");

        // Ha van SELENIUM_REMOTE_URL env változó (Docker-ben ez lesz beállítva),
        // akkor a konténerben futó Chrome-hoz csatlakozunk RemoteWebDriver-rel.
        // Ha nincs (pl. helyi gépen futtatod IDE-ből), sima ChromeDriver-t indítunk.
        String remoteUrl = System.getenv("SELENIUM_REMOTE_URL");
        if (remoteUrl != null && !remoteUrl.isBlank()) {
            driver = new RemoteWebDriver(new URL(remoteUrl), options);
        } else {
            driver = new ChromeDriver(options);
        }

        wait = new WebDriverWait(driver, Duration.ofSeconds(15));
    }

    @Test
    void deletingItemFromCart_removesItFromCartList() {
        // 1. Storefront megnyitása
        driver.get("https://www.aldi.us/store/aldi/storefront");
        
        // CHOOSE STORE 
        WebElement chooseStore = wait.until(ExpectedConditions.elementToBeClickable(
                By.xpath("/html/body/div[12]/div[1]/div/div[1]/div[3]/button[1]/div/div")));
        chooseStore.click();

        WebElement confirmButton = wait.until(ExpectedConditions.elementToBeClickable(
                By.xpath("//*[@id="id-99"]/div[2]/button")));
        confirmButton.click();

        // 2. Add-to-cart gomb
        WebElement addToCartBtn = wait.until(ExpectedConditions.elementToBeClickable(
                By.xpath("//div[@id='store-wrapper']/div/div/div[4]/div/div/div/div/div/div/div[2]/ul/li/div/div/div/div/div/div/button")));
        addToCartBtn.click();

        // 3. Shopping List (kosár) ikon
        WebElement cartIcon = wait.until(ExpectedConditions.elementToBeClickable(
                By.xpath("//div[@id='js-app']/div/header/div[2]/div[2]/span/button/span")));
        cartIcon.click();

        // 4. Törlés gomb a kosárban lévő tételen (a "Meat & Seafood" szöveget követő 2. svg)
        WebElement deleteIcon = wait.until(ExpectedConditions.elementToBeClickable(
                By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='Meat & Seafood'])[10]/following::*[name()='svg'][2]")));
        deleteIcon.click();

        // 5. "Manage" gomb
        WebElement manageBtn = wait.until(ExpectedConditions.elementToBeClickable(
                By.xpath("//div[@id='cart_dialog']/div/header/div/div[3]/button/span/div")));
        manageBtn.click();

        // 6. Törlés megerősítése a dialógusban
        WebElement confirmDeleteBtn = wait.until(ExpectedConditions.elementToBeClickable(
                By.xpath("//div[@id='id-282']/button[4]/span/div")));
        confirmDeleteBtn.click();

        // --- Assert ---
        List<WebElement> remainingItems = driver.findElements(
                By.xpath("//div[@id='cart_dialog']//*[contains(text(),'Meat & Seafood')]"));

        assertTrue(remainingItems.isEmpty(),
                "Removed item 'Meat & Seafood' should not be present in the cart after deletion.");
    }

    @AfterEach
    void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}