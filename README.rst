Triplets
========

Small, reusable UI elements that support singular stylesheets; lightweight
templating syntax; and object-oriented event bindings. Largely intended to be a
better-organized, static-friendly (buildless) alternative to React, based on
the RequireJS module definitions.

Host the static files locally to see a quick demo. If you have Python
installed, the easiest way to do this is::

  > python -m http.server

...then browse to "http://localhost:8000".

What Is A Triplet?
------------------

A triplet is a set of three files that define a reusable UI element:

* A .CSS file that is singular (that is, attached only once) to the document
  *<head/>*, which the browser will use to determine the rendering / layout /
  styling of the UI element

* An .HTML file that defines a Handlebars-compatible template from which
  individual UI elements are rendered (includes support for control flow, macro
  extension, iteration, arbitrary template fields, etc.)

* A .JS file that defines a basic object for wrapping the UI element in
  behavior

Where Is Triplet Defined?
-------------------------

There are two underlying modules that define the Triplet system:

* "lib/triploader.js" defines the RequireJS loader extension used by other code
  (in this example, index.js) to "require" (import) Triplets

* "lib/Trip.js", which defines the base class (including common/shared
  behavior) for Triplet-based UI elements

How Do I Define A Triplet?
--------------------------

A new triplet can be defined by a folder that contains an "index.css",
"index.html", and "index.js" file. (These are currently hard-coded; I am toying
with the idea of having a more flexible naming system.)

The CSS and HTML files are static and fairly straightforward. The JS file
should define an object that extends from Trip (e.g., the export of the
"lib/Trip" module).

This object should invoke the parent constructor (e.g., "super()") and, if
applicable, declare any bindings with the "bind()" method::

  > this.bind("button", "click");

This method takes two parameters:

* A CSS-style selector, which will be invoked against the subdom rendered from
  the template to resolve a set of elements

* An event tag that will be listened to from that element; when fired, the
  event object will be relayed to any listeners subscribed to that instance

I'm looking forward to expanding a set (or library) of self-contained UI
elements that anyone can just plug-and-play. Lots of fun directions this
could go in. Remember what Bootstrap used to be like? I miss that.

How Do I Use A Triplet?
-----------------------

Once you have defined a Triplet, you need to configure the RequireJS loader to
use "triploader"::

  > require.config({"paths": { "trip": "lib/triploader" }});

Now, you can "require()" any Trip folders the same way you would import any
other dependencies::

  > require(["trip!lib/Header"], function(Header) { ... });

Once imported, you can instantiate an instance of that Triplet, using a chain
of methods to define template fields; attach event listeners; and finally
append the element (by default, to the document body)::

  > let h = new Header().set("title", "Loaded.").on("mouseover", console.log).append();

I Have A Question About Your Design Decisions.
----------------------------------------------

I'm sure you do. While I won't go through all the specifics, there are a few
guiding principles that led me to put this capability together:

#. Self-contained UI elements are great for reusability

#. Single-file JavaScript modules are the way I like to code web applications

#. CSS only needs to be attached once, and Handlebars makes for a great
   lightweight templating language

#. The only really unique code for 90% of UI elements is defining/routing the
   event bindings

#. I don't want to maintain build configurations for web applications--press 
   "F5" and watch your new build run. Inspect directly, tweak CSS, and write
   the styles you like directly back into the source. Life can be simple--and
   simplicity enables greater complexity in the long run.

#. Compared to (for example) IMGUI, browser-level UI reusability is really
   starting to suffer. We need to catch up, in a way that maximizes reusability
   but leverages as much as possible of browser-accelerated DOM.
