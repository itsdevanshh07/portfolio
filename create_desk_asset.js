import { Document, Accessor, NodeIO } from '@gltf-transform/core';
import fs from 'fs';
import path from 'path';

async function createAsset() {
    const doc = new Document();
    const scene = doc.createScene('Scene');
    const buffer = doc.createBuffer();

    // Colors
    const colorBeige = [0.9, 0.88, 0.82]; // Brighter Retro Beige
    const colorDarkBeige = [0.75, 0.73, 0.65];
    const colorDeskTop = [0.15, 0.15, 0.15]; // Dark charcoal
    const colorDeskFrame = [0.8, 0.8, 0.8]; // Light metal
    const colorChairLeather = [0.5, 0.3, 0.2]; // Rich brown
    const colorPlantGreen = [0.3, 0.6, 0.2]; // Vibrant green
    const colorWhite = [0.95, 0.95, 0.95];

    function createBox(w, h, d, color) {
        const x = w / 2;
        const y = h / 2;
        const z = d / 2;

        const positions = new Float32Array([
            // Front
            -x, -y, z, x, -y, z, x, y, z, -x, y, z,
            // Back
            -x, -y, -z, -x, y, -z, x, y, -z, x, -y, -z,
            // Top
            -x, y, -z, -x, y, z, x, y, z, x, y, -z,
            // Bottom
            -x, -y, -z, x, -y, -z, x, -y, z, -x, -y, z,
            // Right
            x, -y, -z, x, y, -z, x, y, z, x, -y, z,
            // Left
            -x, -y, -z, -x, -y, z, -x, y, z, -x, y, -z,
        ]);

        const indices = new Uint16Array([
            0, 1, 2, 0, 2, 3,    // Front
            4, 5, 6, 4, 6, 7,    // Back
            8, 9, 10, 8, 10, 11, // Top
            12, 13, 14, 12, 14, 15, // Bottom
            16, 17, 18, 16, 18, 19, // Right
            20, 21, 22, 20, 22, 23  // Left
        ]);

        const colors = new Float32Array(positions.length);
        for (let i = 0; i < positions.length; i += 3) {
            const factor = 0.9 + Math.random() * 0.1;
            colors[i] = color[0] * factor;
            colors[i + 1] = color[1] * factor;
            colors[i + 2] = color[2] * factor;
        }

        const posAccessor = doc.createAccessor().setType(Accessor.Type.VEC3).setArray(positions).setBuffer(buffer);
        const colorAccessor = doc.createAccessor().setType(Accessor.Type.VEC3).setArray(colors).setBuffer(buffer);
        const indAccessor = doc.createAccessor().setType(Accessor.Type.SCALAR).setArray(indices).setBuffer(buffer);

        return doc.createPrimitive().setIndices(indAccessor).setAttribute('POSITION', posAccessor).setAttribute('COLOR_0', colorAccessor);
    }

    // Materials
    const matBeige = doc.createMaterial('Mat_Beige').setBaseColorFactor([...colorBeige, 1.0]).setRoughnessFactor(0.7);
    const matDeskTop = doc.createMaterial('Mat_DeskTop').setBaseColorFactor([...colorDeskTop, 1.0]).setRoughnessFactor(0.4);
    const matDeskFrame = doc.createMaterial('Mat_DeskFrame').setBaseColorFactor([...colorDeskFrame, 1.0]).setRoughnessFactor(0.2).setMetallicFactor(0.8);
    const matLeather = doc.createMaterial('Mat_Leather').setBaseColorFactor([...colorChairLeather, 1.0]).setRoughnessFactor(0.8);
    const matPlant = doc.createMaterial('Mat_Plant').setBaseColorFactor([...colorPlantGreen, 1.0]).setRoughnessFactor(1.0);
    const matScreen = doc.createMaterial('Mat_Screen').setBaseColorFactor([0, 0, 0, 1.0]).setRoughnessFactor(1.0);

    // 1. Desk Top
    const deskTopMesh = doc.createMesh('Desk_Top');
    deskTopMesh.addPrimitive(createBox(2.0, 0.05, 1.0, colorDeskTop).setMaterial(matDeskTop));
    scene.addChild(doc.createNode('Desk_Top').setMesh(deskTopMesh).setTranslation([0, 0.75, 0]));

    // 2. Desk Legs
    const legMesh = doc.createMesh('Desk_Leg');
    legMesh.addPrimitive(createBox(0.05, 0.75, 0.05, colorDeskFrame).setMaterial(matDeskFrame));
    [[0.9, 0.375, 0.45], [-0.9, 0.375, 0.45], [0.9, 0.375, -0.45], [-0.9, 0.375, -0.45]].forEach((p, i) => {
        scene.addChild(doc.createNode(`Leg_${i}`).setMesh(legMesh).setTranslation(p));
    });

    // 3. PC Case (Desktop)
    const caseMesh = doc.createMesh('PC_Case');
    caseMesh.addPrimitive(createBox(0.5, 0.18, 0.5, colorBeige).setMaterial(matBeige));
    scene.addChild(doc.createNode('PC_Case').setMesh(caseMesh).setTranslation([0, 0.865, -0.1]));

    // 4. Monitor Stand
    const standMesh = doc.createMesh('Monitor_Stand');
    standMesh.addPrimitive(createBox(0.2, 0.05, 0.2, colorDarkBeige).setMaterial(matBeige));
    scene.addChild(doc.createNode('Monitor_Stand').setMesh(standMesh).setTranslation([0, 0.775, -0.1]));

    // 5. CRT Monitor Body (Beveled look with 2 boxes)
    const monitorMainMesh = doc.createMesh('Monitor_Body');
    monitorMainMesh.addPrimitive(createBox(0.45, 0.4, 0.35, colorBeige).setMaterial(matBeige));
    scene.addChild(doc.createNode('Monitor_Body').setMesh(monitorMainMesh).setTranslation([0, 1.0, -0.15]));

    const monitorFrontMesh = doc.createMesh('Monitor_Front');
    monitorFrontMesh.addPrimitive(createBox(0.42, 0.38, 0.05, colorBeige).setMaterial(matBeige));
    scene.addChild(doc.createNode('Monitor_Front').setMesh(monitorFrontMesh).setTranslation([0, 1.0, 0.05]));

    // 6. Monitor Screen (Plane)
    const screenMesh = doc.createMesh('Monitor_Screen');
    screenMesh.addPrimitive(createBox(0.38, 0.3, 0.01, [0.05, 0.05, 0.05]).setMaterial(matScreen));
    scene.addChild(doc.createNode('Monitor_Screen').setMesh(screenMesh).setTranslation([0, 1.0, 0.08]));

    // 7. Keyboard
    const kbMesh = doc.createMesh('Keyboard');
    kbMesh.addPrimitive(createBox(0.45, 0.04, 0.2, colorBeige).setMaterial(matBeige));
    scene.addChild(doc.createNode('Keyboard').setMesh(kbMesh).setTranslation([0, 0.795, 0.3]));

    // 8. Mouse
    const mouseMesh = doc.createMesh('Mouse');
    mouseMesh.addPrimitive(createBox(0.08, 0.04, 0.12, colorBeige).setMaterial(matBeige));
    scene.addChild(doc.createNode('Mouse').setMesh(mouseMesh).setTranslation([0.35, 0.795, 0.3]));

    // 9. Chair
    const chairSeatMesh = doc.createMesh('Chair_Seat');
    chairSeatMesh.addPrimitive(createBox(0.55, 0.1, 0.55, colorChairLeather).setMaterial(matLeather));
    scene.addChild(doc.createNode('Chair_Seat').setMesh(chairSeatMesh).setTranslation([0, 0.45, 0.9]));

    const chairBackMesh = doc.createMesh('Chair_Back');
    chairBackMesh.addPrimitive(createBox(0.5, 0.5, 0.08, colorChairLeather).setMaterial(matLeather));
    scene.addChild(doc.createNode('Chair_Back').setMesh(chairBackMesh).setTranslation([0, 0.95, 1.15]));

    const chairArmMesh = doc.createMesh('Chair_Arm');
    chairArmMesh.addPrimitive(createBox(0.05, 0.3, 0.4, [0.2, 0.2, 0.2]).setMaterial(matDeskFrame));
    scene.addChild(doc.createNode('Chair_Arm_L').setMesh(chairArmMesh).setTranslation([-0.3, 0.65, 0.9]));
    scene.addChild(doc.createNode('Chair_Arm_R').setMesh(chairArmMesh).setTranslation([0.3, 0.65, 0.9]));

    // 10. Plant (Pot + Leaves)
    const potMesh = doc.createMesh('Plant_Pot');
    potMesh.addPrimitive(createBox(0.15, 0.2, 0.15, [0.6, 0.4, 0.3]).setMaterial(matBeige));
    scene.addChild(doc.createNode('Plant_Pot').setMesh(potMesh).setTranslation([-0.8, 0.85, -0.3]));

    const leavesMesh = doc.createMesh('Plant_Leaves');
    // Create multiple leaf clusters
    leavesMesh.addPrimitive(createBox(0.25, 0.3, 0.25, colorPlantGreen).setMaterial(matPlant));
    scene.addChild(doc.createNode('Plant_Leaves_1').setMesh(leavesMesh).setTranslation([-0.8, 1.1, -0.3]));
    scene.addChild(doc.createNode('Plant_Leaves_2').setMesh(leavesMesh).setTranslation([-0.75, 1.0, -0.25]));

    // 11. Folders & Mug
    const folderMesh = doc.createMesh('Folders');
    folderMesh.addPrimitive(createBox(0.06, 0.35, 0.25, [0.7, 0.5, 0.3]).setMaterial(matBeige));
    scene.addChild(doc.createNode('Folders_1').setMesh(folderMesh).setTranslation([0.7, 0.925, -0.2]));
    scene.addChild(doc.createNode('Folders_2').setMesh(folderMesh).setTranslation([0.77, 0.925, -0.2]));

    const mugMesh = doc.createMesh('Mug');
    mugMesh.addPrimitive(createBox(0.08, 0.12, 0.08, colorWhite).setMaterial(matBeige));
    scene.addChild(doc.createNode('Mug').setMesh(mugMesh).setTranslation([0.5, 0.81, 0.1]));

    // Export
    const nodeIO = new NodeIO();
    const glbBuffer = await nodeIO.writeBinary(doc);
    const outputPath = path.resolve('public/desk_setup.glb');
    fs.writeFileSync(outputPath, glbBuffer);
    console.log(`Final detailed asset created successfully at ${outputPath}`);
}

createAsset().catch(console.error);
