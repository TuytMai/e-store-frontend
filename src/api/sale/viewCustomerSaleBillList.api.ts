import Revision from "@/types/Revision";
import SaleBill, { SaleProductResponse } from "@/types/entity/SaleBill";
import withQuery from "@/utils/withQuery";
import apiInstance from "../apiInstance";

export default async function viewCustomerSaleBillList({
    queryKey,
}: {
    queryKey: any;
}): Promise<any> {
    const [_key, customerId] = queryKey;
    const response = await apiInstance.get(
        withQuery("/sale", {
            customerId
        }),
    );

    const saleBillList = response.data as Revision<
        SaleBill<SaleProductResponse>
    >[];

    return saleBillList;
}
