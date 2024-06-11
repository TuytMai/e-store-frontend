import Product from "@/types/entity/Product";
import apiInstance from "../apiInstance";
import Supplier from "@/types/entity/Supplier";

export default async function viewDetailProductSupplier({
    queryKey,
}: {
    queryKey: any;
}): Promise<Supplier[]> {
    const [_key, id] = queryKey;
    const response = await apiInstance.get(`/product/${id}/suppliers`, {});

    return response.data;
}
