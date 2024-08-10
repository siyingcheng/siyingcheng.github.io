import{_ as t,D as n,c as r,j as i,a,I as e,a4 as l,o as h}from"./chunks/framework.C7RUBq8A.js";const v=JSON.parse('{"title":"Recording a Trace, Screenshot, and Video","titleTemplate":"Playwright","description":"Notes for Playwright Recording a Trace, Screenshot, and Video","frontmatter":{"title":"Recording a Trace, Screenshot, and Video","titleTemplate":"Playwright","description":"Notes for Playwright Recording a Trace, Screenshot, and Video","head":[["meta",{"name":"description","content":"Notes for Playwright Recording a Trace, Screenshot, and Video"}]],"tags":["Playwright"],"categories":["Notes"]},"headers":[],"relativePath":"notes/playwright/recording.md","filePath":"notes/playwright/recording.md","lastUpdated":1723267598000}'),o={name:"notes/playwright/recording.md"},p={id:"recording-a-trace-screenshot-and-video",tabindex:"-1"},d=i("a",{class:"header-anchor",href:"#recording-a-trace-screenshot-and-video","aria-label":'Permalink to "Recording a Trace, Screenshot, and Video <Badge type="tip" text="Playwright" /><Badge type="warning" text="Notes" />"'},"​",-1),c=l(`<h2 id="recording-a-trace" tabindex="-1">Recording a Trace <a class="header-anchor" href="#recording-a-trace" aria-label="Permalink to &quot;Recording a Trace&quot;">​</a></h2><p>By default the <code>playwright.config</code> file will contain the configuration needed to create a <code>trace.zip</code> file for each test. Traces are setup to run <code>on-first-retry</code> meaning they will be run on the first retry of a failed test. Also <code>retries</code> are set to 2 when running on CI and 0 locally. This means the traces will be recorded on the first retry of a failed test but not on the first run and not on the second retry.</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// playwright.config.js</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { defineConfig } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;@playwright/test&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> defineConfig</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  retries: process.env.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">CI</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ?</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> :</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// set to 2 when running on CI</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // ...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  use: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    trace: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;on-first-retry&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// record traces on first retry of each test</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div><p>Or, you can force tracing to be on:</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npx</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> playwright</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --trace</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> on</span></span></code></pre></div><p>Available options to record a trace:</p><ul><li><code>&#39;on-first-retry&#39;</code> - Record a trace only when retrying a test for the first time.</li><li><code>&#39;on-all-retries&#39;</code> - Record traces for all test retries.</li><li><code>&#39;off</code>&#39; - Do not record a trace.</li><li><code>&#39;on&#39;</code> - Record a trace for each test. (not recommended as it&#39;s performance heavy)</li><li><code>&#39;retain-on-failure&#39;</code> - Record a trace for each test, but remove it from successful test runs.</li></ul><p>You can also use trace: <code>&#39;retain-on-failure&#39;</code> if you do not enable retries but still want traces for failed tests.</p><h2 id="opening-the-trace" tabindex="-1">Opening the trace <a class="header-anchor" href="#opening-the-trace" aria-label="Permalink to &quot;Opening the trace&quot;">​</a></h2><p>You can open the saved trace using the Playwright CLI or in your browser on <code>trace.playwright.dev</code>. Make sure to add the full path to where your <code>trace.zip</code> file is located. This should include the full path to your <code>trace.zip</code> file.</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npx</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> playwright</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> show-trace</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> path/to/trace.zip</span></span></code></pre></div><blockquote><p><a href="https://trace.playwright.dev/" target="_blank" rel="noreferrer">trace.playwright.dev</a> is a statically hosted variant of the Trace Viewer. You can upload trace files using drag and drop.</p></blockquote><p>Viewing remote traces:</p><p>You can open remote traces using it&#39;s URL. They could be generated on a CI run which makes it easy to view the remote trace without having to manually download the file.</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npx</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> playwright</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> show-trace</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://example.com/trace.zip</span></span></code></pre></div><p>You can also pass the URL of your uploaded trace (e.g. inside your CI) from some accessible storage as a parameter. CORS (Cross-Origin Resource Sharing) rules might apply.</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">https://trace.playwright.dev/?trace</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">=https://demo.playwright.dev/reports/todomvc/data/cb0fa77ebd9487a5c899f3ae65a7ffdbac681182.zip</span></span></code></pre></div><h2 id="screenshot-and-video" tabindex="-1">Screenshot and Video <a class="header-anchor" href="#screenshot-and-video" aria-label="Permalink to &quot;Screenshot and Video&quot;">​</a></h2><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { defineConfig } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;@playwright/test&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> defineConfig</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  use: {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // Capture screenshot after each test failure.</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    screenshot: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;only-on-failure&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // Record trace only when retrying a test for the first time.</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    trace: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;on-first-retry&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // Record video only when retrying a test for the first time.</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    video: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;on-first-retry&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div>`,19);function k(g,y,u,E,f,F){const s=n("Badge");return h(),r("div",null,[i("h1",p,[a("Recording a Trace, Screenshot, and Video "),e(s,{type:"tip",text:"Playwright"}),e(s,{type:"warning",text:"Notes"}),a(),d]),c])}const C=t(o,[["render",k]]);export{v as __pageData,C as default};