function init(){
    // add our rendering surface and initialize the renderer
    var container = document.createElement('div');
    document.body.appendChild(container);

    document.body.appendChild(container);
    info = document.createElement('div');
    info.style.position = 'absolute';
    info.style.top = '5px';
    info.style.left = '5px';
    info.style.width = '100%';
    info.style.textAlign = 'left';
    info.style.color = "lightblue";
    info.innerHTML = "Yifan";
    container.appendChild(info);


    renderer = new THREE.WebGLRenderer();
    // set some state - here just clear color
    renderer.setClearColor(new THREE.Color(0x333333));
    renderer.setSize(window.innerWidth, window.innerHeight);
    // add the output of the renderer to the html element
    container.appendChild(renderer.domElement);


    // All drawing will be organized in a scene graph
    var scene = new THREE.Scene();
    // A camera with fovy = 90deg means the z distance is y/2
    szScreen = 120;

    // show axes at the origin
    var axes = new THREE.AxesHelper(10);
    scene.add(axes);

    var teapotGeometry = new THREE.TeapotGeometry(5, 15, true, true, true, false, false);
    var teapot = new THREE.Mesh(teapotGeometry, new THREE.MeshBasicMaterial({ color: 'red' }));
    // Set position 
    teapot.position.set(0, 0, 0);
    scene.add(teapot);

    // calcaulate aspectRatio
    var aspectRatio = window.innerWidth / window.innerHeight;
    // Camera needs to be global
    camera = new THREE.PerspectiveCamera(90, aspectRatio, 1, 1000);
    // position the camera back and point to the center of the scene
    camera.position.z = szScreen / 2;
    camera.lookAt(scene.position);
 
    // render the scene
    renderer.render(scene, camera);

    view = "Front"

    var controls = new function() {
        this.view = "Front"
        this.switchCamera = function() {
            if(this.view = "Front") {
                camera.position.z = 0;
                camera.position.y - szScreen/2;
                camera.lookAt(scene.position);
                this.view = "Top";
            }else{
                camera.position.z = szScreen/2
                camera.position.y = 0
                camera.lookAt(scene.position);
                this.view = "Front"
            }
            view = this.view
        }
    };



    var gui = new dat.GUI();
    gui.add(controls, 'switchCamera');
    gui.add(controls, 'view').listen();
    render();
    function render(){
        requestAnimationFrame(render);
        
        teapot.position.x = R *(((1-k)*Math.cos(t)) + l*k*Math.cos((1-k)/k *t));
        teapot.position.y = R *(((1-k)*Math.sin(t)) + l*k*Math.sin((1-k)/k *t));
    }

}


function onResize() {
    var aspect = window.innerWidth / window.innerHeight;
    camera.aspect = aspect;
   
    camera.updateProjectionMatrix();
    // If we use a canvas then we also have to worry of resizing it
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.onload = init;

// register our resize event function
window.addEventListener('resize', onResize, true);