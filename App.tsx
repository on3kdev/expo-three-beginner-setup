import * as React from "react";
import { StyleSheet, View } from "react-native";
// @ts-ignore
import { View as GraphicsView } from "expo-graphics";
import ExpoTHREE from "expo-three";
import * as THREE from "three";
import { ExpoWebGLRenderingContext } from "expo-gl";

export default function App() {
  let renderer: ExpoTHREE.Renderer;
  let cube: THREE.Mesh;
  let camera: THREE.PerspectiveCamera;
  let scene: THREE.Scene;

  return (
    <>
      <View
        style={{
          flex: 1,
          overflow: "hidden",
          width: "100%",
          height: "100%",
        }}
      >
        <GraphicsView
          style={styles.container}
          onContextCreate={async ({
            gl,
            width,
            height,
            scale: pixelRatio,
          }: {
            gl: ExpoWebGLRenderingContext;
            canvas: any;
            width: number;
            height: number;
            scale: any;
          }) => {
            renderer = new ExpoTHREE.Renderer({
              gl,
              pixelRatio,
              width,
              height,
            });
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
            camera.position.z = 5;

            const geometry = new THREE.BoxBufferGeometry(1, 2, 1);
            const material = new THREE.MeshPhongMaterial({
              color: 0xff0000,
            });

            cube = new THREE.Mesh(geometry, material);
            cube.position.x = 0;
            scene.add(cube);

            scene.add(new THREE.AmbientLight(0x404040));

            const light = new THREE.DirectionalLight(0xffffff, 0.5);
            light.position.set(3, 3, 3);
            scene.add(light);
            renderer.render(scene, camera);
          }}
          onResize={({
            width,
            height,
            scale,
          }: {
            width: any;
            height: any;
            scale: any;
          }) => {
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setPixelRatio(scale);
            renderer.setSize(width, height);
          }}
          onRender={(delta: number) => {
            cube.rotation.z += 4 * delta;
            cube.rotation.y += 1 * delta;

            renderer.render(scene, camera);
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    width: "100%",
    height: "100%",
  },
});
