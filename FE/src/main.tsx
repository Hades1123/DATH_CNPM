import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { router } from '@/routes/route'
import { RouterProvider } from "react-router";
import '@/styles/global.css'


createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
)
