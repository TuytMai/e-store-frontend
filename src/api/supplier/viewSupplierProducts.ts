import Supplier from "@/types/entity/Supplier";
import apiInstance from "../apiInstance";
import Product from "@/types/entity/Product";

export default async function viewSupplierProducts({
    queryKey,
}: {
    queryKey: any;
}): Promise<Product[]> {
    const [_key, id] = queryKey;
    const response = await apiInstance.get(`/supplier/${id}/products`, {});

    return response.data;
}
