import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function ApplicantAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Applicants (16)</AccordionTrigger>
        <AccordionContent>
            <div>
                <p>John Bell</p>
            </div>
            <div>
                <p>John Bell</p>
            </div>
            <div>
                <p>John Bell</p>
            </div>
            <div>
                <p>John Bell</p>
            </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
