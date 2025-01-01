// index.js
const { chromium } = require('playwright');
require('dotenv').config();

async function main() {
    let browser;
    let page;
    try {
        // Launch the browser
        console.log('Launching browser...');
        browser = await chromium.launch({ 
            headless: false,  // Set to false so we can see what's happening
        });
        
        // Create a new context and page
        const context = await browser.newContext();
        page = await context.newPage();
        
        // Navigate to the initial page
        console.log('Navigating to initial page...');
        await page.goto('https://www.travelagents.marriott.com/travelagents/hss/signin.mi');
        
        // Wait for 2 seconds to make sure everything loads
        await page.waitForTimeout(100);
        
        // Click the "Travel Advisor Sign In" button
        console.log('Clicking Travel Advisor Sign In...');
        await page.click('text=Travel Advisor Sign In');
        
        // Wait for page load after click
        console.log('Waiting for page to load after click...');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(100);
        
        // Debug: Log current URL
        console.log('Current URL:', await page.url());
        
        // Now try to click the SIGN IN tab
        console.log('Looking for SIGN IN tab...');
        await page.waitForSelector('[role="tab"]', { state: 'visible' });
        const signInTab = await page.$('button[role="tab"]:has-text("SIGN IN")');
        if (signInTab) {
            console.log('Found SIGN IN tab, clicking...');
            await signInTab.click();
            await page.waitForTimeout(100);
        }

        // Fill the form
        console.log('Filling the form...');
        await page.fill('[placeholder="Email"]', process.env.MARRIOTT_USERNAME);
        await page.fill('[placeholder="Password"]', process.env.MARRIOTT_PASSWORD);
        
        // Click the SIGN IN button
        console.log('Clicking final SIGN IN button...');
        await page.click('button:has-text("SIGN IN"):not([role="tab"])');
        
        
        console.log('Login successful!');

        await page.click('button:has-text("BOOK FAM-TASTIC")');
        
  
    } catch (error) {
        console.error('An error occurred:', error);
        if (page) {
            try {
                const url = await page.url();
                console.log('Failed at URL:', url);
                await page.screenshot({ path: 'error-screenshot.png' });
            } catch (e) {
                console.error('Could not capture debug info:', e);
            }
        }
    } 
}

main();