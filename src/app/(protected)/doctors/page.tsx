import { PlusIcon } from "lucide-react";

import {
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutHeaderContent,
  LayoutHeaderDescription,
  LayoutHeaderTitle,
  LayoutRoot,
} from "@/components/root-layout";
import { Button } from "@/components/ui/button";

const DoctorsPage = () => {
  return (
    <LayoutRoot>
      <LayoutHeader>
        <LayoutHeaderContent>
          <LayoutHeaderTitle>Médicos</LayoutHeaderTitle>
          <LayoutHeaderDescription>
            Gerencie os Médicos da sua clínica
          </LayoutHeaderDescription>
        </LayoutHeaderContent>
        <LayoutActions>
          <Button>
            <PlusIcon />
            Adicionar médico
          </Button>
        </LayoutActions>
      </LayoutHeader>
      <LayoutContent>Médicos</LayoutContent>
    </LayoutRoot>
  );
};

export default DoctorsPage;
