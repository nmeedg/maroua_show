'use client';
import { Button } from "@/components/ui/button"
import { Loader2Icon } from "lucide-react";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

function page() {
    const searchParams = useSearchParams();
    const utmSource = searchParams.get("utm_source");
    const clientReferenceId = searchParams.get("client_reference_id");
    const utmCampaign = searchParams.get("utm_campaign");
    const router = useRouter();

    useEffect(() => {
        if (utmSource=='mesomb' && clientReferenceId=='empirebykrole' && utmCampaign=='concertbadnovaxminks') {
           //proceed save in database
        } else {
            router.replace('/');
        }
    }, []);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <h1 className="text-2xl font-bold text-center block my-20 ">Page de confirmation du payement</h1>
            <div className="flex"><Button className="disbled" variant="outline"> <Loader2Icon className="animate-spin mr-2" ></Loader2Icon> Confirmation en cours  </Button></div>
        </div>
    )
}

export default page