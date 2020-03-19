$("ul").on("mouseenter", "li",function(){
    $(this).css("font-weight", "bold");
});

$("ul").on("mouseleave","li", function(){
    $(this).css("font-weight", "normal");
});

$("ul").on("click", "li", function(){
	$(this).toggleClass("done");
});

$(".fa-plus").click(function(){
	$("input[type='text']").fadeToggle();
})

//delete this list.
$("ul").on("click", "span", function(event){
	//$(this).addClass("delete");
    //alert('click');
	$(this).parent().fadeOut(500, function(){
		$(this).remove();
	});
	event.stopPropagation();
});

$("input[type='text']").keypress(function(event){
	if (event.which === 13) {
		var todo = $(this).val();
		$(this).val("");
		$("ul").append("<li><span><i class='fa fa-trash'></i></span>" + todo + "</li>");
	}
	
});
