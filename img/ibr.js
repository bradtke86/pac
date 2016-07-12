
// IBR specific Javascript code

window.onload = init;

function init() {
    minimizemenu();
    replaceat(document);
    focusform();
    initresultquery();
    inittablesorter();
}

function inittablesorter() {
    $(document).ready(function() 
        { 
            $(".tablesorter").tablesorter(); 
        } 
    );
}

function minimizemenu() {
    var i;

    menu = getElementsByClass("linke_spalte")[0].getElementsByTagName("div")[0];
    
    // if (! document.getElementById("adminrulez")) { return; }

    var items = menu.getElementsByTagName("li");
    for (i = 0; i < items.length; i++) {
	var item = items[i];
	if (item.parentNode && (item.parentNode.parentNode == menu)) {
	    // a top level item
	} else {
	    if (getElementsByClass("active", item.parentNode).length > 0) {
		// a sibling is active
		if (item.style) {
		    item.style.display = "block";
		}
	    } else {
		var pattern = new RegExp("(^|\\s)active(\\s|$)");
		if (pattern.test(item.parentNode.parentNode.className)) {
		    // the parent is active
		    item.style.display = "block";
		} else {
		    // default on 2nd level is "none", we don't need this
		    // item.style.display = "none";
		}
	    }
	}
    }
}

function replaceat(node) {
    var i;

    if (node.nodeType == 1) {
	for (i = 0; i < node.attributes.length; i++) {
	    v = node.attributes[i].nodeValue;
	    v = v.replace(/\[\[at\]\]/g, "@");
	    node.attributes[i].nodeValue = v;
	}	
    }

    if (node.nodeType == 3) {
	v = node.nodeValue;
	v = v.replace(/\[\[at\]\]/g, "@");
	node.nodeValue = v;
    }

    if (node.hasChildNodes()) {
	for (i = 0; i < node.childNodes.length; i++) {
	    replaceat(node.childNodes[i]);
	}
    }
}

function focusform() {
    node = document.getElementById("searchpattern");
    if (node) {
	node.focus();
    }
}


function deleteText(form){
    if (form.defaultValue==form.value)
 	form.value = ""
}



function getElementsByClass(searchClass, node, tag) {
    var classElements = new Array();
    if ( node == null )
	node = document;
    if ( tag == null )
	tag = '*';
    var els = node.getElementsByTagName(tag);
    var elsLen = els.length;
    var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
    for (i = 0, j = 0; i < elsLen; i++) {
	if ( pattern.test(els[i].className) ) {
	    classElements[j] = els[i];
	    j++;
	}
    }
    return classElements;
}


/////////////////////

// copied from: www.tu-braunschweig.de:

var delayclean;

function clean_xcm_functions() {
    $("li.dynamic").css("display", "none");
    //document.getElementById("xcm_functions").style.visibility = 'hidden';
    return;
}

function mouseonmenu() {
    if(delayclean) {
	cleartimer();
    }
    $("li.dynamic").css("display", "block");
    //document.getElementById("xcm_functions").style.visibility = 'visible';
}

function cleandelay() {
    delayclean = setTimeout("clean_xcm_functions()", 500);
}

function cleartimer() {
    clearTimeout(delayclean);
}


/////////////////////


//
// dynamicforms.js
// This part contains functions that are called upon events raised
// from within a web form that has been created by the XSD driven
// stylesheet edit.xsl. We make some assumption on the structure of
// such web forms. So be careful to keep this script and edit.xsl in
// sync.
//
// strauss, 2005-09-30.
//

function gettr(elem) {
  return elem.parentNode.parentNode;
}



function getvarname(tr) {
    // assume 4th <td> contains the input element
    var name = null;

    try {
	name = getname(tr);
    } catch(e) {
	;
    }

    if (name != null) {
	name = name.replace(/_\d+$/,"");
	name = name.replace(/^[^_]+_/,"");
    } else {
	name = "";
    }

    return name;
}



function getbasename(tr) {
    // assume 4th <td> contains the input element
    var name;

    name = getname(tr);

    if (name) {
	return name.replace(/_\d+$/,"");
    } else {
	return "";
    }
}



function getname(tr) {
    // assume 4th <td> contains the input element
    var name;

    try {
	if (tr.childNodes[3]) {
	    name = tr.childNodes[3].childNodes[0].getAttribute("name");
	}
    } catch (e) {
	;
    }
    if (! name) {
	try {
	    name = tr.childNodes[0].childNodes[0].getAttribute("name");
	} catch (e2) {
	    ;
	}
    }
    if (! name) {
	try {
	    trs = tr.childNodes[3].childNodes[0].childNodes[0].childNodes;
	    tr2 = trs[trs.length - 1];
	    name = tr2.childNodes[0].childNodes[0].getAttribute("name");
	} catch (e3) {
	    ;
	}
    }

    return name;
}



function getfullname(basename, pos) {
    if (pos == 1) {
	return basename;
    } else {
	pos2 = "000" + pos;
	pos2 = pos2.substr(pos2.length - 3, 3);
	return basename + "_" + pos2;
    }
}



function getcount(tr) {
    var varname = getvarname(tr);
    var n = 1;
    var tr2;

    for (tr2 = tr;
	 (tr2.nextSibling) && (getvarname(tr2.nextSibling) == varname);
	 tr2 = tr2.nextSibling) {
	n++;
    }
    for (tr2 = tr;
	 (tr2.previousSibling) && (getvarname(tr2.previousSibling) == varname);
	 tr2 = tr2.previousSibling) {
	n++;
    }

    return n;
}



function setname(tr, name) {
    var oldname;

    try {
	if (tr.childNodes[3]) {
	    oldname = tr.childNodes[3].childNodes[0].getAttribute("name");
	    tr.childNodes[3].childNodes[0].setAttribute("name", name);
	}
    } catch (e) {
	;
    }
    if (! oldname) {
	try {
	    oldname = tr.childNodes[0].childNodes[0].getAttribute("name");
	    tr.childNodes[0].childNodes[0].setAttribute("name", name);
	} catch (e2) {
	    ;
	}
    }
    if (! oldname) {
	try {
	    trs = tr.childNodes[3].childNodes[0].childNodes[0].childNodes;
	    tr2 = trs[trs.length - 1];
	    oldname = tr2.childNodes[0].childNodes[0].getAttribute("name");
	    tr2.childNodes[0].childNodes[0].setAttribute("name", name);
	} catch (e3) {
	    ;
	}
    }
}



function getpos(tr) {
    var s = tr.childNodes[3].childNodes[0].getAttribute("name");
    var regexp = /^.*_(\d*)/; regexp.exec(s); s = RegExp.$1;
    var pos = parseInt(s);
    if (pos >= 2) return pos;
    return 1;
}



function add(elem, max) {
    var tr;
    
    oldtr = gettr(elem);
    
    if (getcount(oldtr) == max) {
	/*
	alert("No more than " + max + " instance(s) of this field!");
	*/
	return;
    } 
    
    basename = getbasename(oldtr);
    varname = getvarname(oldtr);
    newtr = oldtr.cloneNode(true);
    newtr.childNodes[3].childNodes[0].value = "";
    oldtr.parentNode.insertBefore(newtr, oldtr.nextSibling);

    for (tr = newtr; getvarname(tr) == varname; tr = tr.nextSibling) {
	if (! add_incnames(tr, basename)) {
	    setname(tr, getfullname(basename, 0 + getpos(tr) + 1));
	}
	try {
	    tr.childNodes[1].childNodes[0].setAttribute("style", "visibility:visible");
	} catch (e) {
	    ;
	}
    }
    for (tr = newtr; getvarname(tr) == varname; tr = tr.previousSibling) {
	try {
	    tr.childNodes[1].childNodes[0].setAttribute("style", "visibility:visible");
	} catch (e) {
	    ;
	}
    }
}



function add_incnames(parent, base) {
    base = base.replace(/^[^_]+_/,"");
    trs = parent.getElementsByTagName("tr");
    var done = 0;
    for (i = 0; i < trs.length; i++) {
	tr = trs[i];
	oldname = getname(tr);
	if (oldname) {
	    newname = oldname.substr(0, oldname.indexOf(base) + base.length);
	    num = oldname.substr(newname.length + 1);
	    rest = num.replace(/^[^_]+/,"");
	    num = num.replace(/_.+$/,""); 
	    if (num <= 1) { num = 1; }
	    num++;
	    pos2 = "000" + num;
	    pos2 = pos2.substr(pos2.length - 3, 3);
	    newname = newname + "_" + pos2 + rest;
	    // alert(base + ": " + oldname + " -> " + newname);
	    setname(tr, newname);
	    done = 1;
	}
    }
    return done;
}


function del(elem, min) {
    oldtr = gettr(elem);

    basename = getbasename(oldtr);

    oldcount = getcount(oldtr);

    if (oldcount == min) {
	/*
	if (min == 1) {
	    alert("This field is mandatory!");
	} else {
	    alert("No less than " + min + " instance(s) of this field!");
	}
	*/
	// return;
    }

    addnode = oldtr.childNodes[0].childNodes[0];
    delnode = oldtr.childNodes[1].childNodes[0];
    inputnode = oldtr.childNodes[3].childNodes[0];

    if (oldcount == 1) {
	// don't remove the row, if it is the last one, so that
	// a new entry can be entered. however, we have to hide
	// the "del" button and clear the value.
	delnode.setAttribute("style", "visibility:hidden");
	// if it's an input element...
	if (inputnode.getAttributeNode("value")) {
	    inputnode.setAttribute("value","");
	    inputnode.value = "";
	}
	// if it's a textarea...
	if (inputnode.nodeName == "TEXTAREA") {
	    n = inputnode.childNodes.length;
	    inputnode.value = "";
	    for (i = n-1; i >= 0; i--) {
		if ((inputnode.childNodes[i].nodeType == 1) ||
		    (inputnode.childNodes[i].nodeType >= 3)) {
		    inputnode.removeChild(inputnode.childNodes[i]);
		}
	    }
	}
	// if it's a select box...
	if (inputnode.nodeName == "SELECT") {
	    n = inputnode.childNodes.length;
	    for (i = n-1; i >= 0; i--) {
		if (inputnode.childNodes[i].getAttributeNode("selected")) {
		    inputnode.childNodes[i].
			removeAttributeNode(inputnode.childNodes[i].
					    getAttributeNode("selected"));
		}
	    }
	    s = document.createAttribute("selected");
	    s.nodeValue = "selected";
	    inputnode.childNodes[n-1].setAttributeNode(s);
	    inputnode.selectedIndex = n-1;
	}

    } else {

	/*
	if (oldtr.nextSibling) {
	    for (tr = oldtr.nextSibling; (tr.nextSibling) && (getbasename(tr) == basename); tr = tr.nextSibling) {
		setname(tr, getfullname(basename, 0 + getpos(tr) - 1));
	    }
	}
	*/

	//oldtr.parentNode.removeChild(oldtr);
	remove_subtree(oldtr.parentNode, oldtr);
	inputnode.name = "";
	
	/*
	if ((oldcount - 1) <= min) {
	    for (tr in parent.childNodes) {
		if (getbasename(tr) == basename) {
		    tr.childNodes[1].childNodes[0].setAttribute("style", "visibility:hidden");
		}
	    }
	}
	*/

    }
}



function change(elem, min) {
    tr = gettr(elem);
    value = elem.value;
    
    if (value == "") {
	tr.childNodes[1].childNodes[0].setAttribute("style", "visibility:hidden");
    } else {
	tr.childNodes[1].childNodes[0].setAttribute("style", "visibility:visible");
    }

    custom_change(elem, min);
}



function removeitem(url, l) {
    if (l == "de") {
	q = "Soll dieser Datensatz wirklich gelöscht werden?";
    } else {
	q = "Are you sure to delete this record?";
    }
    check = confirm(q);
    if (check) {
	parent = url;
	parent = parent.replace(/(^.*)\/[^\/]*$/,"$1/");  // strip to base filename
	location.href = parent + "?action=delete;argument=" + url;
    }
}



function create(url, l) {
    if (l == "de") {
	q = "ID des neuen Datensatzes? (Bitte einen kurzen prägnanten Namen - im Zweifelsfall mit englischem Wortstamm - in Kleinbuchstaben und ohne Leer- und Sonderzeichen wählen, z.B. \"testlab-ns2\".)";
    } else {
	q = "ID of the new record? (Please choose a concise lowercase name without blanks and special characters, e.g., \"testlab-ns2\".)";
    }
    oldname = "?";

    var conn = new XMLHttpRequest();
    conn.open("GET", url + "?action=initcreate", false);
    conn.setRequestHeader("Content-Type", "text/xml");
    conn.send(null);
    var doc = document.implementation.createHTMLDocument("example");
    doc.documentElement.innerHTML = conn.responseText;
    template = doc.getElementById("action_result_doc").textContent;
    schema = doc.getElementById("action_result_schemaLocation").textContent;

    name = template;
    name = name.replace(/^.*\/([^\/]*)$/,"$1");  // strip to base filename
    name = name.replace(/.xml$/,"");             // strip .xml extension
    name = name.replace(/[^a-zA-Z0-9\-\.]/g,""); // strip any chars but letters, numbers, "-" and "."

    // increment number, if it's a library item
    if (name.match(/^D\.[0-9][0-9]\.3[0-9][0-9][0-9]$/)) {
	n = name.substr(5);
	// do we need this "+1" ?! (steinb, 2011-08-29)
	n = parseInt(n) + 1;
	name = name.substr(0,5) + n;
    }

    // loop until an acceptable ID was entered
    while (name == "" || name != oldname) {
	oldname = name;
	name = prompt(q, name);
	if ((name == "null") || (name == "")) return;
	oldname = name;
	name = name.replace(/.xml$/,"");
	name = name.replace(/[^a-zA-Z0-9\-\.]/g,"");
    }

    newuri = template;
    newuri = newuri.replace(/\/[^\/]*$/,"");
    newuri = newuri + "/" + name + ".xml";
    newuri2 = newuri.replace(/^[^\/]*\/\/[^\/]*/,"");
    schemauri = schema;
    schemauri = schemauri.replace(/^[^\/]*\/\/[^\/]*/,"");
    targeturi = newuri + "?xslt=/xsl/edit.xsl&action=create&argument=" + newuri2 + "&argument2=" + schemauri + "&lang=" + l;
    // targeturi = newuri + "?xslt=/xsl/edit.xsl&action=create " + newuri2 + " " + schemauri + "&lang=" + l;
    location.href = targeturi;
}



function go(url) {
    url = url.replace(/&amp;/g,"&");
    url = url.replace(/&#38;/g,"&");
    location.href = url;
}


function submit() {
    // f = document.getElementsByName("Editform")[0];
    f = document.getElementById("Editform");
    f.submit();
}


function remove_subtree(parent, node) {
    for (n = parent.firstChilde; n; n = n.nextSibling) {
	remove_subtree(node, n);
    }
    parent.removeChild(node);
}



///////////////////////

function initresultquery() {

    $("#resultqueryform").submit(function(e) {
	var postData = $(this).serializeArray();
	var formURL = $(this).attr("action");
	$.ajax({
	    url : formURL,
	    type: "POST",
	    data : postData,
	    success:function(data, textStatus, jqXHR) 
	    {
		if (data.score) {
		    $("#resultquery-score").html(data.score);
		} else {
		    $("#resultquery-score").html('');
		}
		if (data.scoresum) {
		    $("#resultquery-scoresum").html(data.scoresum);
		} else {
		    $("#resultquery-scoresum").html('Matrikelnummer oder Code nicht gefunden');
		}
		if (data.grade) {
		    $("#resultquery-grade").html(data.grade);
		} else {
		    $("#resultquery-grade").html('');
		}
	    },
	    error: function(jqXHR, textStatus, errorThrown) 
	    {
		// alert("error");
	    }
	});
	e.preventDefault();
    });

}


/////////////////////

// taken from https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest ...

"use strict";

if (!XMLHttpRequest.prototype.sendAsBinary) {
  XMLHttpRequest.prototype.sendAsBinary = function(sData) {
    var nBytes = sData.length, ui8Data = new Uint8Array(nBytes);
    for (var nIdx = 0; nIdx < nBytes; nIdx++) {
      ui8Data[nIdx] = sData.charCodeAt(nIdx) & 0xff;
    }
    this.send(ui8Data);
  };
}

var AJAXSubmit = (function () {

    function clearError() {
	var node = document.getElementsByClassName("footer")[0].getElementsByTagName("td")[0];
	if (node) {
	    var old = node.getElementsByTagName("span");
	    if (old.length == 1) {
		node.removeChild(old[0]);
	    }
	}
    }

  function ajaxSuccess () {
      var doc = document.implementation.createHTMLDocument("example");
      doc.documentElement.innerHTML = this.responseText;
      // alert(doc);

      var n = doc.getElementById("action_result_ok");
      if (n) {
	  var result = n.textContent;
	  var node = document.getElementsByClassName("footer")[0].getElementsByTagName("td")[0];
	  node.innerHTML = "<div class='result'>" + result + "</div>";
	  var forms = document.getElementsByTagName("form");
	  // disable all form inputs
	  for (var i = 0; i < forms.length; i++) {
              if ((" " + forms[i].className + " ").indexOf(" list ") > -1) {
		  for (var e = 0; e < forms[i].length; e++) {
		      forms[i].elements[e].disabled = true;
		  }
              }
	  }
	  // hide all elements' trashcans
	  var pm = document.getElementsByClassName("plusminus");
	  for (var i = 0; i < pm.length; i++) {
	      pm[i].setAttribute("style", "visibility:hidden");

	  }

      }
      n = doc.getElementById("action_result_error");
      if (n) {
	  var result = n.textContent;
	  clearError();
	  var node = document.getElementsByClassName("footer")[0].getElementsByTagName("td")[0];
	  //node.innerHTML += "<div class='result error'>" + result + "</div>";
	  node.appendChild(n);
	  var forms = document.getElementsByTagName("form");
	  for (var i = 0; i < forms.length; i++) {
              if ((" " + forms[i].className + " ").indexOf(" list ") > -1) {
		  for (var e = 0; e < forms[i].length; e++) {
		      forms[i].elements[e].addEventListener('focus', clearError, true);
		  }
              }
	  }
      }
  }

  function submitData (oData) {
    var oAjaxReq = new XMLHttpRequest();
    oAjaxReq.submittedData = oData;
    oAjaxReq.onload = ajaxSuccess;
    if (oData.technique === 0) {
      oAjaxReq.open("get", oData.receiver.replace(/(?:\?.*)?$/, oData.segments.length > 0 ? "?" + oData.segments.join("&") : ""), true);
      oAjaxReq.send(null);
    } else {
      oAjaxReq.open("post", oData.receiver, true);
      if (oData.technique === 3) {
        var sBoundary = "---------------------------" + Date.now().toString(16);
        oAjaxReq.setRequestHeader("Content-Type", "multipart\/form-data; boundary=" + sBoundary);
        oAjaxReq.sendAsBinary("--" + sBoundary + "\r\n" + oData.segments.join("--" + sBoundary + "\r\n") + "--" + sBoundary + "--\r\n");
      } else {
        oAjaxReq.setRequestHeader("Content-Type", oData.contentType);
        oAjaxReq.send(oData.segments.join(oData.technique === 2 ? "\r\n" : "&"));
      }
    }
  }

  function processStatus (oData) {
    if (oData.status > 0) { return; }
    submitData (oData);
  }

  function pushSegment (oFREvt) {
    this.owner.segments[this.segmentIdx] += oFREvt.target.result + "\r\n";
    this.owner.status--;
    processStatus(this.owner);
  }

  function plainEscape (sText) {
    return sText.replace(/[\s\=\\]/g, "\\$&");
  }

  function SubmitRequest (oTarget) {
    var nFile, sFieldType, oField, oSegmReq, oFile, bIsPost = oTarget.method.toLowerCase() === "post";
    this.contentType = bIsPost && oTarget.enctype ? oTarget.enctype : "application\/x-www-form-urlencoded";
    this.technique = bIsPost ? this.contentType === "multipart\/form-data" ? 3 : this.contentType === "text\/plain" ? 2 : 1 : 0;
    this.receiver = oTarget.action;
    this.status = 0;
    this.segments = [];
    var fFilter = this.technique === 2 ? plainEscape : escape;
    for (var nItem = 0; nItem < oTarget.elements.length; nItem++) {
      oField = oTarget.elements[nItem];
      if (!oField.hasAttribute("name")) { continue; }
      sFieldType = oField.nodeName.toUpperCase() === "INPUT" ? oField.getAttribute("type").toUpperCase() : "TEXT";
      if (sFieldType === "FILE" && oField.files.length > 0) {
        if (this.technique === 3) {
          for (nFile = 0; nFile < oField.files.length; nFile++) {
            oFile = oField.files[nFile];
            oSegmReq = new FileReader();
            oSegmReq.segmentIdx = this.segments.length;
            oSegmReq.owner = this;
            oSegmReq.onload = pushSegment;
            this.segments.push("Content-Disposition: form-data; name=\"" + oField.name + "\"; filename=\""+ oFile.name + "\"\r\nContent-Type: " + oFile.type + "\r\n\r\n");
            this.status++;
            oSegmReq.readAsBinaryString(oFile);
          }
        } else {
          for (nFile = 0; nFile < oField.files.length; this.segments.push(fFilter(oField.name) + "=" + fFilter(oField.files[nFile++].name)));
        }
      } else if ((sFieldType !== "RADIO" && sFieldType !== "CHECKBOX") || oField.checked) {
        this.segments.push(
          this.technique === 3 ? /* enctype is multipart/form-data */
            "Content-Disposition: form-data; name=\"" + oField.name + "\"\r\n\r\n" + oField.value + "\r\n"
          : 
            fFilter(oField.name) + "=" + fFilter(oField.value)
        );
      }
    }
    processStatus(this);
  }

  return function (oFormElement) {
    if (!oFormElement.action) { return; }
    new SubmitRequest(oFormElement);
  };

})();

function submitListEntry(node) {
    AJAXSubmit(node);
}

/////////////////////

