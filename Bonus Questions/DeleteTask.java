import org.junit.jupiter.api.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;

import static org.junit.jupiter.api.Assertions.*;

public class DeleteTaskTest {

    private WebDriver driver;

    @BeforeEach
    public void setUp() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();

        // Open ALDI website
        driver.get("https://www.aldi.us/store/aldi/storefront");
		
		// Add product to cart
        WebElement addButton = driver.findElement(
                By.xpath("//div[@id='store-wrapper']/div/div/div[4]/div/div/div/div/div/div/div[2]/ul/li/div/div/div/div/div/div/button")
        );

        addButton.click();

        Thread.sleep(2000);
    }


    @Test
    public void testDeleteTaskFeature() throws InterruptedException {

 
        // Open cart
        WebElement cartButton = driver.findElement(
                By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='Items in cart: 1'])[1]/following::*[name()='svg'][1]")
        );

        cartButton.click();

        Thread.sleep(2000);


        // Select item category / item in cart
        WebElement itemButton = driver.findElement(
                By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='Meat & Seafood'])[12]/following::*[name()='svg'][2]")
        );

        itemButton.click();

        Thread.sleep(1000);


        // Remove item from cart
        WebElement deleteButton = driver.findElement(
                By.xpath("//div[@id='cart_dialog']/div/header/div/div[3]/button/span/div")
        );

        deleteButton.click();

        Thread.sleep(2000);


        // Confirm delete action
        WebElement confirmDelete = driver.findElement(
                By.xpath("//div[@id='id-259']/button[4]/span/div")
        );

        confirmDelete.click();

        Thread.sleep(2000);


        // Verification: item should no longer exist
        assertThrows(
                NoSuchElementException.class,
                () -> driver.findElement(
                        By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='Items in cart: 1'])[1]")
                )
        );
    }


    @AfterEach
    public void tearDown() {
        driver.quit();
    }
}