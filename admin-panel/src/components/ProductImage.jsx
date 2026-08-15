import { useState, useEffect } from "react";
import { Package } from "lucide-react";
import { categoryImages } from "../utils/categoryImages";

export default function ProductImage({
    image,
    name,
    category,
    heightClass = "h-40",
}) {
    const [imgSrc, setImgSrc] = useState(image || categoryImages[category]);

    // Reset image source when properties change
    useEffect(() => {
        setImgSrc(image || categoryImages[category]);
    }, [image, category]);

    const handleError = () => {
        if (imgSrc === image && categoryImages[category]) {
            // Fall back to category image if primary image fails to load
            setImgSrc(categoryImages[category]);
        } else {
            // Show package icon if category image also fails or if no primary image was provided
            setImgSrc(null);
        }
    };

    if (imgSrc) {
        return (
            <div className={`relative flex items-center justify-center overflow-hidden rounded-md border border-[#b68a2d] bg-white p-3 ${heightClass}`}>
                <img
                    src={imgSrc}
                    alt={name}
                    className="max-h-full max-w-full object-contain"
                    onError={handleError}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-darkText/10 to-transparent pointer-events-none" />
            </div>
        );
    }

    return (
        <div className={`flex flex-col items-center justify-center rounded-md border border-[#b68a2d] bg-[#ecd08b] px-4 text-center ${heightClass}`}>
            <Package size={28} className="text-darkText/70" strokeWidth={1.75} />
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-darkText/70">
                {category}
            </p>
        </div>
    );
}
