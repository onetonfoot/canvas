//Click 
$('body').on('click', '.close', function () {
    document.querySelectorAll(".pannel").forEach(ele => ele.classList.add("hidden"))
    $(".tools").removeClass("selected")
});

currentToolIndex = 0
//Toggles pannels
function togglePannel(i) {
    $(".tools").removeClass("selected")
    $($(".tools")[i]).addClass("selected")
    $(".pannel").addClass("hidden")
    $($(".pannel")[i]).toggleClass("hidden");
    currentToolIndex = i
    console.log(currentToolIndex)
}

$(".tools").click(function (e) {
    // e.preventDefault();
    $(".tools").removeClass("selected")
    $(this).toggleClass("selected")
    $(".pannel").addClass("hidden")
    $(this).find(".pannel").toggleClass("hidden");
    currentToolIndex = $(".tools").index($(this))
    console.log(currentToolIndex)
});


$(window).on("load", function () {
    document.addEventListener('keydown', function (event) {
        if (event.keyCode == 37) {
            document.querySelectorAll(".pannel").forEach(ele => ele.classList.add("hidden"))
            $(".tools").removeClass("selected")
        } else if (event.keyCode == 39) {
            togglePannel(currentToolIndex)
        } else if (event.keyCode == 38) {
            if (currentToolIndex == 0) {
                currentToolIndex = $(".tools").length - 1
                togglePannel(currentToolIndex)
            } else {
                --currentToolIndex
                togglePannel(currentToolIndex)
            }
        } else if (event.keyCode == 40) {
            if (currentToolIndex == $(".tools").length - 1) {
                currentToolIndex = 0
                togglePannel(currentToolIndex)
            } else {
                ++currentToolIndex
                togglePannel(currentToolIndex)
            }
        }
    });

})