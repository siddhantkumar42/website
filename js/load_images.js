function load_images() {
    var images = [
        "/media/images/night_pole.jpg",
        "/media/images/night_cloud.jpg",
        "/media/images/coconut_tree.jpg",
        "/media/images/city_cloud.jpg",
        "/media/images/toxic.jpg"
    ];
    var number1 = Math.floor(Math.random()*images.length);
    document.getElementById("image1").setAttribute("src",images[number1]);
}

load_images();