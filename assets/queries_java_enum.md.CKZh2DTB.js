import{_ as t,D as n,c as l,j as i,a,I as s,a4 as o,o as h}from"./chunks/framework.C7RUBq8A.js";const v=JSON.parse('{"title":"Java Enum","titleTemplate":"Queries","description":"Notes for Java Enum Queries","frontmatter":{"title":"Java Enum","titleTemplate":"Queries","description":"Notes for Java Enum Queries","head":[["meta",{"name":"description","content":"Notes for Java Enum Queries"}]],"tags":["Java"],"categories":["Queries"]},"headers":[],"relativePath":"queries/java/enum.md","filePath":"queries/java/enum.md","lastUpdated":1723267598000}'),r={name:"queries/java/enum.md"},d={id:"java-enum-queries",tabindex:"-1"},p=i("a",{class:"header-anchor",href:"#java-enum-queries","aria-label":'Permalink to "Java Enum Queries <Badge type="tip" text="Java" /><Badge type="warning" text="Queries" />"'},"​",-1),c=o(`<h2 id="are-enums-type-safe" tabindex="-1">Are enums type-safe? <a class="header-anchor" href="#are-enums-type-safe" aria-label="Permalink to &quot;Are enums type-safe?&quot;">​</a></h2><details class="details custom-block"><summary>Answer</summary><p><code>YES</code>, Enums are type-safe in Java. Enums are a way to define a set of named constants. Their values are of a specific type, and they are checked at compile time. This means that if you try to assign a value of the wrong type to an enum, the compiler will give you an error.</p></details><h2 id="what-is-the-order-of-variables-in-enum" tabindex="-1">What is the order of variables in Enum? <a class="header-anchor" href="#what-is-the-order-of-variables-in-enum" aria-label="Permalink to &quot;What is the order of variables in Enum?&quot;">​</a></h2><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Ascending order</span></span>
<span class="line"><span>Descending order</span></span>
<span class="line"><span>Random order</span></span>
<span class="line"><span>Depends on the order() method</span></span></code></pre></div><details class="details custom-block"><summary>Answer</summary><p><code>Ascending order</code>: The <code>compareTo()</code> method is implemented to order the variables in <code>ascending</code> order.</p></details><h2 id="what-will-be-the-the-output-of-the-following-code" tabindex="-1">What will be the the output of the following code? <a class="header-anchor" href="#what-will-be-the-the-output-of-the-following-code" aria-label="Permalink to &quot;What will be the the output of the following code?&quot;">​</a></h2><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">enum</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Season</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    WINTER</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">SPRING</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">SUMMER</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">AUTUMN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">System.out.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">println</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Season.WINTER.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ordinal</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">());</span></span></code></pre></div><details class="details custom-block"><summary>Answer</summary><p><code>0</code>: <code>ordinal()</code> method provides number to the variables defined in Enum. And the first variable in Enum is assigned with <code>0</code>.</p></details><h2 id="which-class-does-all-the-enums-extend" tabindex="-1">Which class does all the Enums extend? <a class="header-anchor" href="#which-class-does-all-the-enums-extend" aria-label="Permalink to &quot;Which class does all the Enums extend?&quot;">​</a></h2><details class="details custom-block"><summary>Answer</summary><p><code>Enum</code>: All enums implicitly extend <code>java.lang.Enum</code>. Since Java does not have multiple inheritance, an enum cannot extend any other class.</p></details><h3 id="what-will-be-the-output-of-the-following-code" tabindex="-1">What will be the output of the following code? <a class="header-anchor" href="#what-will-be-the-output-of-the-following-code" aria-label="Permalink to &quot;What will be the output of the following code?&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">enum</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Levels</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    private</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> TOP,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    public</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> MEDIUM,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    protected</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> LOW;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><ul><li>Compilation Error</li><li>It runs successfully</li><li>EnumNotDefinedException</li><li>Runtime Error</li></ul><details class="details custom-block"><summary>Answer</summary><p><code>Compilation Error</code>: Enum cannot have any modifiers. They are <code>public</code>, <code>static</code> and <code>final</code> by default.</p></details><h2 id="which-method-returns-the-elements-of-enum-class" tabindex="-1">Which method returns the elements of Enum class? <a class="header-anchor" href="#which-method-returns-the-elements-of-enum-class" aria-label="Permalink to &quot;Which method returns the elements of Enum class?&quot;">​</a></h2><ul><li>getEnumList()</li><li>getEnums()</li><li>getEnum()</li><li>getEnumConstants()</li></ul><details class="details custom-block"><summary>Answer</summary><p><code>getEnumConstants()</code>: This method returns an array of all the constants defined in the Enum class. Or <code>null</code> if this class object does not represent an enum type.</p></details>`,17);function u(m,k,E,g,y,f){const e=n("Badge");return h(),l("div",null,[i("h1",d,[a("Java Enum Queries "),s(e,{type:"tip",text:"Java"}),s(e,{type:"warning",text:"Queries"}),a(),p]),c])}const w=t(r,[["render",u]]);export{v as __pageData,w as default};