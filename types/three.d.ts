/// <reference types="@react-three/fiber" />

import type { Object3DNode } from '@react-three/fiber'
import type { Group, Mesh, PointLight, AmbientLight, SpotLight } from 'three'

declare module '@react-three/fiber' {
    interface ThreeElements {
        group: Object3DNode<Group, typeof Group>
        mesh: Object3DNode<Mesh, typeof Mesh>
        pointLight: Object3DNode<PointLight, typeof PointLight>
        ambientLight: Object3DNode<AmbientLight, typeof AmbientLight>
        spotLight: Object3DNode<SpotLight, typeof SpotLight>
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            group: any
            mesh: any
            pointLight: any
            ambientLight: any
            spotLight: any
            gridHelper: any
            fog: any
            planeGeometry: any
            boxGeometry: any
        }
    }
}

export { }
