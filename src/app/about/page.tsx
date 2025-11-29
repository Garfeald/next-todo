import Image from "next/image";
import cls from "./About.module.scss";

export default function About() {
    return (
        <div className={cls.container}>
            <h1>
                <Image
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-6R2Z2ehelgnZed-f__6AQiXcZ3LszgaPSVpFrE-nmg8M7yO7FrVm2y1Wj1E7SR0odIXYexRn6-2X2snkZNL0UBX38KJpDGLcs28gNxEv&s=10'
                    alt="image"
                    width={500}
                    height={500}

                />
                About
            </h1>
        </div>
    );
}
