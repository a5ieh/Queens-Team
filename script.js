let scene, camera, renderer, loader;
let bgMusic = document.getElementById('bg-music');
let doorSound = document.getElementById('door-sound');

init();

function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.set(0,2,5);

    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.getElementById('container').appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff,0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff,1);
    directionalLight.position.set(5,10,7);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    loader = new THREE.GLTFLoader();

    animate();
}

function loadClass(subject){
    document.getElementById('menu').style.display='none';
    doorSound.play();
    setTimeout(()=>{
        bgMusic.play();
        loadModels(subject);
    },800);
}

// تحميل النماذج حسب المادة
function loadModels(subject){
    // جميع المواد تحمل طاولة وكرسي وسبورة
    loadModel('models/table.glb',[0,0,0]);
    loadModel('models/chair.glb',[0,0,-1]);
    loadModel('models/board.glb',[0,0,2]);

    // أدوات خاصة بكل مادة
    if(subject==='biology') loadModel('models/objects_per_subject/biology_item.glb',[1,0,0]);
    if(subject==='chemistry') loadModel('models/objects_per_subject/chemistry_item.glb',[1,0,0]);
    if(subject==='physics') loadModel('models/objects_per_subject/physics_item.glb',[1,0,0]);
    // يمكن إضافة باقي المواد بنفس الطريقة
}

// دالة عامة لتحميل نموذج
function loadModel(path,position){
    loader.load(path, function(gltf){
        let obj = gltf.scene;
        obj.position.set(...position);
        obj.castShadow = true;
        scene.add(obj);
    }, undefined, function(error){
        console.error("خطأ في تحميل النموذج:", path, error);
    });
}

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
}

window.addEventListener('resize',()=>{
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
});
