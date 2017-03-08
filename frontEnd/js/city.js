$(document.body)
.on('show.bs.modal', function () {
	fixModalPadding();
})
.on('hidden.bs.modal', function () {
    fixModalPadding();
});

function fixModalPadding() {
	document.getElementsByTagName("body")[0].removeAttribute("style");
	document.getElementsByTagName("body")[0].removeAttribute("class");
}
