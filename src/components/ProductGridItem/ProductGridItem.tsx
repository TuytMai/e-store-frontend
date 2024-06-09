"use client";

import ProductPreview from "@/types/entity/ProductPreview";
import Image from "next/image";

type Props = {
    product: ProductPreview;
};

export default function ProductGridItem({ product }: Props) {
    const productPhotoURL = product?.photoURL
        ?.split(";")
        ?.filter((v: any) => v)?.[0];

    return (
        <div className=" flex flex-col relative top-0 left-0 hover:-top-1 hover:-left-2 transition-all duration-300 hover:shadow-lg hover:cursor-pointer p-3 rounded-lg">
            <div className=" h-[200px] grid place-items-center overflow-hidden rounded-xl">
                {productPhotoURL ? (
                    <Image
                        src={productPhotoURL}
                        width={250}
                        height={200}
                        objectFit="contain"
                        className=" object-contain"
                        alt="Product photo"
                    />
                ) : (
                    <div className=" w-[250px] h-[200px] bg-secondary-200" />
                )}
            </div>
            <div className=" mt-4">
                <p className=" w-fit text-sm rounded-lg font-semibold px-2 py-1 bg-[#99f6e4] text-[#0f766e]">
                    {product.category}
                </p>
                <div className=" px-2 mt-4">
                    <p className=" font-semibold">{product.name}</p>
                    <p className=" mt-1">x{product.quantity} products</p>
                </div>
            </div>
        </div>
    );
}
