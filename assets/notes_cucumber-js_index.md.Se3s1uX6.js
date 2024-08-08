import{_ as t,D as n,c as p,j as i,a as e,I as a,a4 as h,o}from"./chunks/framework.Ho0cDKEI.js";const v=JSON.parse('{"title":"Cucumber","titleTemplate":"Javascript","description":"Notes for Cucumber.js","frontmatter":{"title":"Cucumber","titleTemplate":"Javascript","description":"Notes for Cucumber.js","head":[["meta",{"name":"description","content":"Notes for Cucumber.js"}]],"tags":["Cucumber"],"categories":["Queries"]},"headers":[],"relativePath":"notes/cucumber-js/index.md","filePath":"notes/cucumber-js/index.md","lastUpdated":1723114068000}'),c={name:"notes/cucumber-js/index.md"},l={id:"cucumber",tabindex:"-1"},r=i("a",{class:"header-anchor",href:"#cucumber","aria-label":'Permalink to "Cucumber <Badge type="tip" text="Cucumber" /><Badge type="warning" text="Notes" />"'},"​",-1),d=h('<div class="info custom-block"><p class="custom-block-title">INFO</p><p>You can learn more about Cucumber at <a href="https://school.cucumber.io/" target="_blank" rel="noreferrer">https://school.cucumber.io/</a>.</p></div><p>Cucumber is a <strong>Behavior-Driven Development (BDD)</strong> tool that supports writing automated tests in a <strong>human-readable</strong> format.</p><details class="details custom-block"><summary>What is BDD?</summary><p><strong>BDD</strong> is an approach that collaboratively specifies the system&#39;s desired behaviour. Each time a piece of behaviour is agreed, we use that specification to &quot;drive&quot; the development of the code that will implement that behaviour.</p></details><h2 id="basic-cli" tabindex="-1">Basic CLI <a class="header-anchor" href="#basic-cli" aria-label="Permalink to &quot;Basic CLI&quot;">​</a></h2><p>To run Cucumber tests, we need to install the <code>cucumber-js</code> package and run the <code>cucumber-js</code> command in the terminal.</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cucumber-js</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --save-dev</span></span></code></pre></div><p>Then, we can run the tests using the following command:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npx</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cucumber-js</span></span></code></pre></div><p>This will run all the feature files in the <code>features</code> directory.</p><p>To run a specific feature file, we can use the <code>--name</code> option:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npx</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cucumber-js</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;My Feature&quot;</span></span></code></pre></div><p>To run a specific scenario, we can use the <code>--name</code> option with the scenario name:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npx</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cucumber-js</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;My Scenario&quot;</span></span></code></pre></div><p>To run a specific scenario outline, we can use the <code>--name</code> option with the scenario outline name and the example row:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npx</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cucumber-js</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;My Scenario Outline&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --example</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;row 1&quot;</span></span></code></pre></div><p>To run all scenarios in a feature file, we can use the <code>--name</code> option with the feature file name:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npx</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cucumber-js</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;My Feature&quot;</span></span></code></pre></div><p>To run all scenarios in a specific directory, we can use the <code>--path</code> option:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npx</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cucumber-js</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --path</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;features/my-directory&quot;</span></span></code></pre></div><p>Output html report:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npx</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cucumber-js</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -f</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> html:reports/cucumber_report.html</span></span></code></pre></div>',21);function u(k,m,b,g,F,C){const s=n("Badge");return o(),p("div",null,[i("h1",l,[e("Cucumber "),a(s,{type:"tip",text:"Cucumber"}),a(s,{type:"warning",text:"Notes"}),e(),r]),d])}const B=t(c,[["render",u]]);export{v as __pageData,B as default};
