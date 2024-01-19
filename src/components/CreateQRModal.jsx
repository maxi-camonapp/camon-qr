import { Button, Dialog, DialogPanel, Icon, TextInput, Title } from "@tremor/react"
import { QrCode, Link } from "lucide-react"
import { useState } from "react"

const CreateQRModal = () => {

  const [open, setOpen] = useState(false)

  return (
    <>
      <Button className="w-full" icon={QrCode} onClick={() => setOpen(true)}>
      Crear QR
      </Button>
      <Dialog open={open} onClose={setOpen}>
        <DialogPanel>
          <Title>Crear un nuevo QR</Title>

          <form>
            <TextInput icon={Link} placeholder="URL"/>

            <Button>Enviar</Button>
          </form>

        </DialogPanel>
      </Dialog>
    </>
  )
}

export default CreateQRModal