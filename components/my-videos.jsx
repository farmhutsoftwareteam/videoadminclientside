// import { Button } from "@/components/ui/button"
// import { DialogTitle, DialogDescription, DialogHeader, DialogContent, DialogTrigger, Dialog } from "@/components/ui/dialog"
// import { PlusIcon } from "@/components/ui/icons";
// export function MyVideos() {
//   return (
//     (<div
//       className="grid min-h-screen w-full grid-cols-[280px_1fr] bg-white dark:bg-gray-950">
//       <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
//         <div className="flex h-full max-h-screen flex-col gap-2" />
//       </div>
//       <div className="flex flex-col">
//         <header
//           className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40" />
//         <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
//           <section className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
//             <div className="flex items-center justify-between">
//               <h2 className="text-2xl font-bold">My Videos</h2>
//               <Button size="sm" variant="outline" onClick={() => window.location.href = '/upload'}>
//                 <PlusIcon className="h-4 w-4 mr-2" />
//                 Upload Video
//               </Button>
//             </div>
//             <div
//               className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6" />
//           </section>
//         </main>
//       </div>
//       <Dialog>
//         <DialogTrigger asChild>
//           <div
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//             <div
//               className="bg-white dark:bg-gray-950 rounded-lg shadow-lg w-full max-w-[600px] p-6">
//               <DialogContent>
//                 <DialogHeader>
//                   <DialogTitle />
//                   <DialogDescription>View details and manage your video.</DialogDescription>
//                 </DialogHeader>
//                 <div className="grid grid-cols-[200px_1fr] gap-4 py-4">
//                   <img
//                     className="aspect-video rounded-lg object-cover"
//                     height="180"
//                     src="/placeholder.svg"
//                     width="320" />
//                   <div>
//                     <div className="flex items-center justify-between">
//                       <h3 className="text-lg font-medium" />
//                       <div className="text-sm text-gray-500 dark:text-gray-400" />
//                     </div>
//                     <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
//                       views{"\n"}
//                     </div>
//                     <div className="mt-4 flex gap-2">
//                       <Button variant="outline">Edit</Button>
//                       <Button variant="destructive">Delete</Button>
//                     </div>
//                   </div>
//                 </div>
//               </DialogContent>
//             </div>
//           </div>
//         </DialogTrigger>
//       </Dialog>
//     </div>)
//   );
// }

