import * as THREE from 'three';

			import { RoomEnvironment } from './jsm/environments/RoomEnvironment.js';
			import { OrbitControls } from './jsm/controls/OrbitControls.js';
			import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';


			import { KTX2Loader } from './jsm/loaders/KTX2Loader.js';
			import { MeshoptDecoder } from './jsm/libs/meshopt_decoder.module.js';

			let camera, scene, renderer;

			init();
			render();

			function init() {

				const container = document.createElement( 'div' );
				document.getElementById("3d").appendChild(container);
				//document.body.appendChild( container );

				
				

				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth/2, window.innerHeight/2);
				renderer.toneMapping = THREE.ACESFilmicToneMapping;
				renderer.toneMappingExposure = 1;
				renderer.outputEncoding = THREE.sRGBEncoding;
				container.appendChild( renderer.domElement );

				camera = new THREE.PerspectiveCamera( 65, window.innerWidth / window.innerHeight, 10, 2000 );
				camera.position.set( -5, 100, -10 );

				const environment = new RoomEnvironment();
				const pmremGenerator = new THREE.PMREMGenerator( renderer );

				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0xffffff );
				scene.environment = pmremGenerator.fromScene( environment ).texture;

				/*const grid = new THREE.GridHelper( 500, 10, 0xffffff, 0xffffff );
				grid.material.opacity = 0.5;
				grid.material.depthWrite = false;
				grid.material.transparent = true;
				scene.add( grid );*/

				const ktx2Loader = new KTX2Loader()
					.setTranscoderPath( 'basis/' )
					.detectSupport( renderer );

				const loader = new GLTFLoader().setPath( 'models/gltf/' );
				loader.setKTX2Loader( ktx2Loader );
				loader.setMeshoptDecoder( MeshoptDecoder );
				loader.load( 'carro.glb', function ( gltf ) {

					// coffeemat.glb was produced from the source scene using gltfpack:
					// gltfpack -i coffeemat/scene.gltf -o coffeemat.glb -cc -tc
					// The resulting model uses EXT_meshopt_compression (for geometry) and KHR_texture_basisu (for texture compression using ETC1S/BasisLZ)

					gltf.scene.position.y = 59;

					scene.add( gltf.scene );

					render();

				} );

				

				
				const controls = new OrbitControls( camera, renderer.domElement );
				controls.addEventListener( 'change', render ); // use if there is no animation loop
				controls.minDistance = 400;
				controls.maxDistance = 1000;
				controls.target.set( 10, 90, - 16 );
				controls.update();

				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

				render();

			}

			//

			function render() {

				renderer.render( scene, camera );

			}