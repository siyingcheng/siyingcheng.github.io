import{_ as s,D as r,c as o,j as i,a as t,I as a,a4 as l,o as n}from"./chunks/framework.C7RUBq8A.js";const P=JSON.parse('{"title":"Playwright","titleTemplate":"Notes","description":"Notes for Playwright","frontmatter":{"title":"Playwright","titleTemplate":"Notes","description":"Notes for Playwright","head":[["meta",{"name":"description","content":"Notes for Playwright"}]],"tags":["Playwright"],"categories":["Notes"]},"headers":[],"relativePath":"notes/playwright/index.md","filePath":"notes/playwright/index.md","lastUpdated":1723267598000}'),h={name:"notes/playwright/index.md"},d={id:"playwright",tabindex:"-1"},p=i("a",{class:"header-anchor",href:"#playwright","aria-label":'Permalink to "Playwright <Badge type="tip" text="Playwright" /><Badge type="warning" text="Notes" />"'},"​",-1),c=l(`<div class="tip custom-block"><p class="custom-block-title">TIP</p><p><a href="https://playwright.dev/docs/intro" target="_blank" rel="noreferrer"><em>Here</em></a> is the official documentation for Playwright.</p></div><h2 id="what-is-playwright" tabindex="-1">What is Playwright? <a class="header-anchor" href="#what-is-playwright" aria-label="Permalink to &quot;What is Playwright?&quot;">​</a></h2><p>Playwright is an open-source automation testing tool which is used to test end to end modern web and mobile applications in both headed and headless modes.</p><h2 id="why-playwright" tabindex="-1">Why Playwright? <a class="header-anchor" href="#why-playwright" aria-label="Permalink to &quot;Why Playwright?&quot;">​</a></h2><p><strong>Any browser • Any platform • One API:</strong></p><ul><li><strong>Cross-platform</strong>: Test on Windows, Linux, and macOS, locally or on CI, headless or headed.</li><li><strong>Multiple languages</strong>: Use the Playwright API in TypeScript, JavaScript, Python, .NET, Java.</li><li><strong>Multiple browsers</strong>: Playwright supports all modern rendering engines including Chromium, WebKit, and Firefox.</li><li><strong>Headless and headed modes</strong>: Playwright supports both headless and headed modes.</li><li><strong>Test Mobile Web</strong>： Native mobile emulation of Google Chrome for Android and Mobile Safari. The same rendering engine works on your Desktop and in the Cloud.</li></ul><p><strong>Resilient • No flaky tests:</strong></p><ul><li><strong>Auto-wait.</strong> Playwright waits for elements to be actionable prior to performing actions. It also has a rich set of introspection events. The combination of the two eliminates the need for artificial timeouts - the primary cause of flaky tests.</li><li><strong>Web-first assertions.</strong> Playwright assertions are created specifically for the dynamic web. Checks are automatically retried until the necessary conditions are met.</li><li><strong>Tracing.</strong> Configure test retry strategy, capture execution trace, videos, screenshots to eliminate flakes.</li></ul><p><strong>No trade-offs • No limits:</strong></p><ul><li>Multiple everything.</li><li>Trusted events.</li><li>Test frames, pierce Shadow DOM</li></ul><p><strong>Full isolation • Fast execution:</strong></p><ul><li>Browser contexts.</li><li>Log in once.</li></ul><p><strong>Powerful Tooling:</strong></p><ul><li><a href="https://playwright.dev/docs/codegen" target="_blank" rel="noreferrer">Codegen</a></li><li><a href="https://playwright.dev/docs/inspector" target="_blank" rel="noreferrer">Playwright Inspector</a></li><li><a href="https://playwright.dev/docs/trace-viewer" target="_blank" rel="noreferrer">Playwright Trace Viewer</a></li></ul><p><strong>Advantages:</strong></p><ul><li>Cross platform testing</li><li>Multiple browsers testing</li><li>Multiple languages support</li><li>Headless and headed modes</li><li>Auto wait</li><li>Tracing</li><li>Reporting</li><li>Dynamic wait assertions</li><li>Faster &amp; Reliable</li><li>Screenshots, video recoder</li><li>Powerful tooling - Codegen, Playwright Inspector, Trace viewer</li></ul><p><strong>Disadvantages:</strong></p><ul><li>Limited support for mobile testing</li><li>Limited support for testing of native applications</li><li>Limited support for testing of server-side applications</li><li>Limited support for testing of single-page applications</li></ul><h2 id="basic" tabindex="-1">Basic <a class="header-anchor" href="#basic" aria-label="Permalink to &quot;Basic&quot;">​</a></h2><h3 id="generating-tests" tabindex="-1">Generating tests <a class="header-anchor" href="#generating-tests" aria-label="Permalink to &quot;Generating tests&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npx</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> playwright</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> codegen</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Or specify a URL to generate tests for a website</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npx</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> playwright</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> codegen</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> demo.playwright.dev/todomvc</span></span></code></pre></div><h3 id="run-and-debug" tabindex="-1">Run and Debug <a class="header-anchor" href="#run-and-debug" aria-label="Permalink to &quot;Run and Debug&quot;">​</a></h3><p>Details in <a href="./run-and-debug.html"><em>here</em></a>;</p><h3 id="hooks" tabindex="-1">Hooks <a class="header-anchor" href="#hooks" aria-label="Permalink to &quot;Hooks&quot;">​</a></h3><p>You can use various test hooks such as <code>test.describe</code> to declare a group of tests and <code>test.beforeEach</code> and <code>test.afterEach</code> which are executed before/after each test. Other hooks include the <code>test.beforeAll</code> and <code>test.afterAll</code> which are executed once per worker before/after all tests.</p><blockquote><p><a href="https://github.com/siyingcheng/playwright-demo/blob/ts/001_writing_test/tests/saucedemo/login.spec.ts" target="_blank" rel="noreferrer"><em>Here</em></a> is an example of my demo test suite using the <code>test.describe</code> and <code>test.beforeEach</code>.</p></blockquote>`,26);function g(u,m,y,f,w,b){const e=r("Badge");return n(),o("div",null,[i("h1",d,[t("Playwright "),a(e,{type:"tip",text:"Playwright"}),a(e,{type:"warning",text:"Notes"}),t(),p]),c])}const _=s(h,[["render",g]]);export{P as __pageData,_ as default};