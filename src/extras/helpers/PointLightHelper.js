/**
 * @author alteredq / http://alteredqualia.com/
 *
 *	- shows point light color, intensity, and position
 */

THREE.PointLightHelper = function ( light, sphereSize ) {

	THREE.Object3D.call( this );

	this.light = light;

	// position

	this.position = light.position;

	// color

	this.color = light.color.clone();

	this.color.r *= light.intensity;
	this.color.g *= light.intensity;
	this.color.b *= light.intensity;

	var hexColor = this.color.getHex();

	// light helper

	var bulbGeometry = new THREE.SphereGeometry( sphereSize, 16, 8 );
	var raysGeometry = new THREE.AsteriskGeometry( sphereSize * 1.25, sphereSize * 2.25 );

	var bulbMaterial = new THREE.MeshBasicMaterial( { color: hexColor, fog: false } );
	var raysMaterial = new THREE.LineBasicMaterial( { color: hexColor, fog: false } );

	this.lightSphere = new THREE.Mesh( bulbGeometry, bulbMaterial );
	this.lightRays = new THREE.Line( raysGeometry, raysMaterial, THREE.LinePieces );

	this.add( this.lightSphere );
	this.add( this.lightRays );

	//

	this.lightSphere.properties.isGizmo = true;
	this.lightSphere.properties.gizmoSubject = light;
	this.lightSphere.properties.gizmoRoot = this;

	//

	this.properties.isGizmo = true;

}

THREE.PointLightHelper.prototype = Object.create( THREE.Object3D.prototype );

THREE.PointLightHelper.prototype.update = function () {

	// update sphere and rays colors to light color * light intensity

	this.color.copy( this.light.color );

	var intensity = THREE.Math.clamp( this.light.intensity, 0, 1 );
	this.color.r *= intensity;
	this.color.g *= intensity;
	this.color.b *= intensity;

	this.lightSphere.material.color.copy( this.color );
	this.lightRays.material.color.copy( this.color );

}
