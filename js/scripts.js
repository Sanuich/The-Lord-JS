function slog(a)
{
	return console.log(a);
}

function elcn(s)
{
	return document.getElementsByClassName(s);
}

function elid(id)
{
	return document.getElementById(id);
}

function elqs(s)
{
	return document.querySelectorAll(s);
}


function set_el(el, style, v, suf)
{
	if(suf==undefined) suf="";
	if(v==undefined) v=0;
	return $(el).css(style, v+suf);
}

function change_el(el, style, dv, suf, lim)
{
	if(suf==undefined) suf="";
	if(v==undefined) v=0;
	var v = $(el).css(style);
	v = v.replace(suf,"");
	v = parseInt(v);	
	if(lim!=undefined){
		if(lim>=0 && lim<=v) { if(t1!=undefined) clearInterval(t1); return false;}
		if(lim<0 && Math.abs(lim)<=Math.abs(v)) {if(t1!=undefined) clearInterval(t1); return false;}
	}
	return set_el(el, style, v+dv, suf);
}

var t1;

function anim_element(el, style, v, speed, suf)
{
	var vcur = $(el).css(style);
	if(suf==undefined) suf="";
	vcur = vcur.replace(suf,"");
	vcur = parseInt(vcur);
	dv = 3;
	if(vcur>v) {dv=-3;}
	t1 = setInterval(function(){change_el(el, style, dv, suf, v)}, 1);
}

if(window.jQuery !== undefined){
jQuery.fn.serializeObject = function () {
    var formData = {};
    var formArray = this.serializeArray();
    for (var i = 0, n = formArray.length; i < n; ++i)
         formData[formArray[i].name] = formArray[i].value;
     return formData;
};}

function onresize()
{
	
}

var Ocopy = function(obj, type = 1)
{
	if(type==undefined || type==1) return JSON.parse(JSON.stringify(obj));
}

var Oset = function(target, source, left = false, debug = false)
{
	const keys = Object.keys(source);
	for (const key of keys) {
		/*
		if(typeof source[key] === "object" && source[key] !== null)
		{
			if(typeof target[key] !== "object") target[key] 
		}
		*/
		
		if((left==true && target[key]!==undefined )	|| left==false)
		{
		  if(typeof source[key] !== "object" || source[key] == null || (target[key]===null && typeof source[key] === "object" && source[key]!==null)) 
		  {			 
			 target[key] = source[key];
		  }
		  else Oset(target[key], source[key], left);
		}
	}
}

function SetA(dim, v){
	var a = [];
	if(isNaN(dim) || dim<0) return a;
	for(let i=0; i<dim; i++)
	{
		if(v==undefined) a[i] = [];
		else a[i] = v;
	}
	return a;
}

function InitA(dims, v){
	var a = [];
	var b = [];
	var l = dims.length-1;
	
	for(let i=l; i>=0; i--)
	{
		if(isNaN(dims[i]) || dims[i]<0) continue;
		
		//a = SetA(dims[i]);
		b = Ocopy(a);
		a = [];
		for(let j=0; j<dims[i]; j++)
		{
			if(i==l) a.push(v);
			else {				
				a.push(Ocopy(b));
			}			
		}
	}
	
	return a;
}

var trimArray = function(a)
{
	if(Array.isArray(a)==false) return false;
	let l = a.length;
	if(l==0 || a[l-1]!==undefined) return true;
	a.pop();
	trimArray(a);
	return true;
}

var getFirstEmpty = function(a)
{
	if(Array.isArray(a)==false) return false;
	if(a.length==0) return 0;
	for(i=0; i<a.length; i++)
	{
		if(a[i]==undefined) return i;
	}
	return a.length;
}

Array.prototype.add = function(o)
{
	let i = getFirstEmpty(this);
	if(i===false) return false;
	this[i] = o;
	return i;
}

Array.prototype.remove = function(i)
{
	this[i] = undefined;
	return trimArray(this);
}

function select_cond(var1,var2,eq)
{
	if(eq=='=') return var1==var2;
	if(eq=='<') return var1<var2;
	if(eq=='>') return var1>var2;
	if(eq=='<=') return var1<=var2;
	if(eq=='>=') return var1>=var2;
	if(eq=='<>' || eq=='!=') return var1!=var2;
	return false;
}

function select_ids(Olist, conditions)
{
	var ids = [];
	for(let i=0; i<Olist.length; i++)
	{
		for(let j=0; j<conditions.length; j++)
		{
			if(Olist[i][conditions[j].attr]!=undefined){
				
				if(select_cond(Olist[i][conditions[j].attr], conditions[j].val, conditions[j].cond)==true)
					ids.push(i);
			}
		}
	}
	
	return ids;
}

function isImage(i) {
    return i instanceof HTMLImageElement;
}

function improve_array(a)
{
	if(a==undefined || a.length()==0) return false;
	var b = [];
	let l = a.length();
	for(let i=0; i<l; i++)
	{
		if(a[i]!=undefined) b.push(a[i]);
	}
	return b;
}

function clear_object(o)
{
	if(o==undefiend) return false;
	var o2 = {};
}