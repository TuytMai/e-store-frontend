import SupplierProvider from "../../../contexts/SupplierContext";

export default function Layout(props: {
    children: React.ReactNode;
    supplier: React.ReactNode;
    bill: React.ReactNode;
}) {
    return (
        <div className=" w-full h-full overflow-auto gap-6">
            <SupplierProvider>
                <div className=" mx-auto max-w-3xl flex flex-col">
                    {props.supplier}
                    {props.bill}
                </div>
            </SupplierProvider>
        </div>
    );
}
