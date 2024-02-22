import{_ as t,E as l,c as n,m as e,a as i,J as a,a4 as h,o as p}from"./chunks/framework.DXPoawJ2.js";const T=JSON.parse('{"title":"Type of SQL commands","titleTemplate":"SQL","description":"Type of SQL commands","frontmatter":{"title":"Type of SQL commands","titleTemplate":"SQL","description":"Type of SQL commands","head":[["meta",{"name":"description","content":"Type of SQL commands"}]],"tags":["SQL"],"categories":["Notes"]},"headers":[],"relativePath":"notes/sql/Types-of-SQL-commands.md","filePath":"notes/sql/Types-of-SQL-commands.md","lastUpdated":1708609752000}'),d={name:"notes/sql/Types-of-SQL-commands.md"},o={id:"type-of-sql-commands",tabindex:"-1"},k=e("a",{class:"header-anchor",href:"#type-of-sql-commands","aria-label":'Permalink to "Type of SQL Commands <Badge type="tip" text="SQL" /><Badge type="warning" text="Notes" />"'},"​",-1),r=h('<h2 id="dql" tabindex="-1">DQL <a class="header-anchor" href="#dql" aria-label="Permalink to &quot;DQL&quot;">​</a></h2><p>Data Query Language: <code>SELECT</code></p><ul><li>SELECT: Retrieve data from one or more tables</li></ul><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SELECT</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> customers;</span></span></code></pre></div><h2 id="dml" tabindex="-1">DML <a class="header-anchor" href="#dml" aria-label="Permalink to &quot;DML&quot;">​</a></h2><p>Data Manipulation Language: <code>UPDATE</code>, <code>DELETE</code>, <code>INSERT</code>, <code>TRUNCATE</code></p><ul><li>INSERT: Adds new rows to a table.</li></ul><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">INSERT INTO</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> customers (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, email) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">VALUES</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Simon Si&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;simon.si@example.com&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><ul><li>UPDATE: Modifies existing data in a table</li></ul><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">UPDATE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> customers </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SET</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> email </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;owen@gmail.com&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> WHERE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> id </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div><ul><li>DELETE: Removes rows from a table</li></ul><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">DELETE</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> customers </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">WHERE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> id </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div><ul><li>TRUNCATE: Quickly removes all rows from a table, effectively emptying it.</li></ul><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">TRUNCATE</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> TABLE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> customers;</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">💡</p><ul><li>Faster than DELETE: TRUNCATE is generally faster than <code>DELETE</code> because it doesn&#39;t log individual row deletions.</li><li>Non-recoverable: Data removed by TRUNCATE cannot be rolled back.</li><li>Resets table attributes: TRUNCATE reset identity columns and auto-increment counters to their initial values.</li></ul></div><p>TRUNCATE is often used to efficiently clear large tables or prepare them for new data. It&#39;s essential to use it cautiously as the data removal is irreversible.</p><h2 id="ddl" tabindex="-1">DDL <a class="header-anchor" href="#ddl" aria-label="Permalink to &quot;DDL&quot;">​</a></h2><p>Data Definition Language: <code>CREATE</code>, <code>ALTER</code>, <code>DROP</code>,</p><ul><li>CREATE: Create database objects like tables, views, indexes, etc.</li></ul><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">CREATE</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> TABLE</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> customers</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (id </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">INT</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">name</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> VARCHAR</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">200</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">), email </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">VARCHAR</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">255</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">));</span></span></code></pre></div><ul><li>ALTER: Modifies the structure of existing database objects.</li></ul><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">ALTER</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> TABLE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> customers </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">ADD</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> COLUMN phone_number </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">VARCHAR</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">18</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre></div><ul><li>DROP: Deletes database objects</li></ul><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">DROP</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> TABLE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> customers;</span></span></code></pre></div><h2 id="dcl" tabindex="-1">DCL <a class="header-anchor" href="#dcl" aria-label="Permalink to &quot;DCL&quot;">​</a></h2><p>Data Control Language: <code>GRANT</code>, <code>REVOKE</code></p><ul><li>GRANT: Assigns permissions to users to access or manipulate data.</li></ul><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">GRANT</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> SELECT</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ON</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> customers </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">TO</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> user1;</span></span></code></pre></div><ul><li>REVOKE: Revokes previously granted permissions.</li></ul><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">REVOKE</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> UPDATE</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ON</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> customers </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> user1;</span></span></code></pre></div><h2 id="tcl" tabindex="-1">TCL <a class="header-anchor" href="#tcl" aria-label="Permalink to &quot;TCL&quot;">​</a></h2><p>Transaction Control Language: <code>COMMIT</code>, <code>ROLLBACK</code></p><ul><li>COMMIT: Saves changes made during a transaction, making them permanent.</li><li>ROLLBACK: Undoes changes made during a transaction, reverting to the previous state.</li></ul>',33);function c(E,g,u,y,m,b){const s=l("Badge");return p(),n("div",null,[e("h1",o,[i("Type of SQL Commands "),a(s,{type:"tip",text:"SQL"}),a(s,{type:"warning",text:"Notes"}),i(),k]),r])}const v=t(d,[["render",c]]);export{T as __pageData,v as default};
