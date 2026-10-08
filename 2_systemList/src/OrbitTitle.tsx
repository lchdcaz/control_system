import { useEffect, useState } from "react";

type OrbitTitleProps = {
    text: string;
    radius?: number;
    speed?: number;
    spacing?: number;
};

type LetterData = {
    char: string;
    x: number;
    z: number;
    rotateY: number;
    scale: number;
    opacity: number;
};

export default function OrbitTitle({
    text,
    radius = 180,
    speed = 0.02,
    spacing = 26,
}: OrbitTitleProps) {

    const [time, setTime] = useState(0);

    useEffect(() => {

        let frame = 0;

        const animate = () => {

            setTime((t) => t + speed);

            frame = requestAnimationFrame(animate);

        };

        frame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(frame);

    }, [speed]);

    const center = ((text.length - 1) * spacing) / 2;

const letters: LetterData[] = text.split("").map((char, index) => {

    const angle = time + index * 0.42;

    // 每个字固定排成一排，但整体居中
    const x = index * spacing - center;

    // 真正的圆柱轨道
    const z = Math.cos(angle) * radius;

    // 字母贴着圆柱表面
    const rotateY = -angle * 180 / Math.PI;

    const depth = (z + radius) / (radius * 2);

    const scale = 0.55 + depth * 0.45;

    const opacity = 0.2 + depth * 0.8;

    return {
        char,
        x,
        z,
        rotateY,
        scale,
        opacity,
    };

});

    return (

        <div
            style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                perspective: "1600px",
                overflow: "visible",
            }}
        >

            <div
                style={{
                    position: "relative",
                    height: "80px",
                    transformStyle: "preserve-3d",
                }}
            >

                {letters.map((letter, index) => (

    <span
        key={index}
        style={{

            position: "absolute",

            left: "50%",
            marginLeft: `${letter.x}px`,

            top: "0px",

            whiteSpace: "pre",

            fontSize: "48px",

            fontWeight: 700,

            color: "white",

            transformStyle: "preserve-3d",

transform: `
    translateX(-50%)
    translateZ(${letter.z}px)
    rotateY(${letter.rotateY}deg)
    scale(${letter.scale})
`,

            opacity: letter.opacity,

            textShadow: `
                0 0 10px rgba(255,255,255,.35),
                0 0 20px rgba(255,255,255,.15)
            `,

            transition: "transform .016s linear",

            userSelect: "none",

            pointerEvents: "none",

        }}
    >

        {letter.char === " " ? "\u00A0" : letter.char}

    </span>

))}

            </div>

        </div>

    );

}