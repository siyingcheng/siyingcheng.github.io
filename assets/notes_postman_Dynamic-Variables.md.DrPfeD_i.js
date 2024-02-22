import{_ as r,E as i,c as o,m as e,a,J as s,t as l,o as c}from"./chunks/framework.DXPoawJ2.js";const x=JSON.parse('{"title":"Dynamic Variables","titleTemplate":"Postman","description":"Postman Dynamic Variables","frontmatter":{"title":"Dynamic Variables","titleTemplate":"Postman","description":"Postman Dynamic Variables","head":[["meta",{"name":"description","content":"Postman Dynamic Variables"}]],"tags":["SQL"],"categories":["Notes"]},"headers":[],"relativePath":"notes/postman/Dynamic-Variables.md","filePath":"notes/postman/Dynamic-Variables.md","lastUpdated":1708609752000}'),m={name:"notes/postman/Dynamic-Variables.md"},d={id:"dynamic-variables",tabindex:"-1"},p=e("a",{class:"header-anchor",href:"#dynamic-variables","aria-label":'Permalink to "Dynamic Variables <Badge type="tip" text="Postman" /><Badge type="warning" text="Notes" />"'},"​",-1),u=e("p",null,[a("Postman uses the "),e("a",{href:"https://www.npmjs.com/package/@faker-js/faker",target:"_blank",rel:"noreferrer"},[e("em",null,"faker")]),a(" library to generate sample data, including random names, addresses, email addresses, and much more. You can use these pre-defined variables multiple times to return different values per request.")],-1),_=e("p",null,[a("And "),e("a",{href:"https://learning.postman.com/docs/designing-and-developing-your-api/mocking-data/creating-dynamic-responses/",target:"_blank",rel:"noreferrer"},[e("em",null,"here")]),a(" is the official documentation. "),e("a",{href:"https://learning.postman.com/docs/writing-scripts/script-references/variables-list/",target:"_blank",rel:"noreferrer"},[e("em",null,"Dynamic variables list")])],-1),b={class:"tip custom-block"},h=e("p",{class:"custom-block-title"},"💡 Use Dynamic Variables in scripts or pre-request",-1),f=e("code",null,"pm.variables.replaceIn()",-1);function y(n,g,D,V,v,k){const t=i("Badge");return c(),o("div",null,[e("h1",d,[a("Dynamic Variables "),s(t,{type:"tip",text:"Postman"}),s(t,{type:"warning",text:"Notes"}),a(),p]),u,_,e("div",b,[h,e("p",null,[a("To use dynamic variables in pre-request or test scripts, you need to use  "),f,a(", for example  "),e("code",null,"pm.variables.replaceIn('"+l(n.$randomFirstName)+"')",1),a(".")])])])}const N=r(m,[["render",y]]);export{x as __pageData,N as default};
