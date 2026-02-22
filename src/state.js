import { proxy } from 'valtio';

const state = proxy({
    currentSection: 'desktop', // 'desktop' or 'monitor'
    cameraPosition: [0, 1.5, 5],
    cameraTarget: [0, 0.8, 0],
    isTransitioning: false,
});

export { state };
