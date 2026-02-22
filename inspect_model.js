import { NodeIO } from '@gltf-transform/core';
import path from 'path';

async function inspectGLB() {
    const io = new NodeIO();
    const doc = await io.read('C:/Users/undhy/OneDrive/Desktop/portfolio/retro office desk 3d model.glb');
    const root = doc.getRoot();
    const scene = root.listScenes()[0];

    console.log('--- Nodes ---');
    scene.traverse((node) => {
        console.log(`Node: ${node.getName()}`);
        const mesh = node.getMesh();
        if (mesh) {
            console.log(`  Mesh: ${mesh.getName()}`);
            mesh.listPrimitives().forEach((prim, i) => {
                const mat = prim.getMaterial();
                console.log(`    Primitive ${i} Material: ${mat ? mat.getName() : 'None'}`);
            });
        }
    });
}

inspectGLB().catch(console.error);
