import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.goto('http://localhost:3000')
        await page.wait_for_selector('.react-flow__controls-button')
        
        # Take initial screenshot in dark mode
        await page.screenshot(path='dark-mode.png')
        
        # Click the theme toggle (it's the last button in the controls list)
        buttons = await page.query_selector_all('.react-flow__controls-button')
        if buttons:
            await buttons[-1].click()
            await page.wait_for_timeout(500)  # Wait for transition
            await page.screenshot(path='light-mode.png')
            
        await browser.close()

asyncio.run(run())
