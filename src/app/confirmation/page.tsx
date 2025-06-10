import { Suspense } from "react"
import Page from "./ConfirmationClient" // Ton composant `Page` renommé ici

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<p>Chargement...</p>}>
      <Page />
    </Suspense>
  )
}
