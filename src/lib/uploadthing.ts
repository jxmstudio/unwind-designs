import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const uploadRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  productImages: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 10,
    },
  })
    .middleware(async () => {
      // This code runs on your server before upload
      // TODO: Add authentication when needed
      // For now, allowing all uploads
      return { userId: "anonymous" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code runs on your server after upload
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
      
      // You can use the file.url to save to your database
      // Example: await db.product.update({ where: { id: productId }, data: { imageUrl: file.url } })
    }),

  profilePictures: f({
    image: {
      maxFileSize: "2MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      // TODO: Add authentication when needed
      // For now, allowing all uploads
      return { userId: "anonymous" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Profile picture upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
    }),

  documents: f({
    pdf: {
      maxFileSize: "8MB",
      maxFileCount: 5,
    },
    text: {
      maxFileSize: "1MB",
      maxFileCount: 5,
    },
  })
    .middleware(async () => {
      // TODO: Add authentication when needed
      // For now, allowing all uploads
      return { userId: "anonymous" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Document upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;

// Helper function to generate upload URLs
export async function generateUploadUrl(
  fileType: "productImages" | "profilePictures" | "documents",
  fileName: string
) {
  try {
    // This would typically call your UploadThing API
    // For now, returning a placeholder
    return {
      success: true,
      uploadUrl: `/api/uploadthing/${fileType}`,
      fileName,
    };
  } catch (error) {
    console.error('Error generating upload URL:', error);
    return { success: false, error: 'Failed to generate upload URL' };
  }
}

// Helper function to delete uploaded files
export async function deleteUploadedFile(fileId: string) {
  try {
    // This would typically call your UploadThing API to delete the file
    console.log('Deleting file:', fileId);
    
    return { success: true, message: 'File deleted successfully' };
  } catch (error) {
    console.error('Error deleting file:', error);
    return { success: false, error: 'Failed to delete file' };
  }
}

// Helper function to get file info
export async function getFileInfo(fileId: string) {
  try {
    // This would typically call your UploadThing API to get file info
    console.log('Getting file info for:', fileId);
    
    return {
      success: true,
      fileInfo: {
        id: fileId,
        name: 'placeholder.jpg',
        size: 1024,
        url: 'https://placeholder.com/image.jpg',
        uploadedAt: new Date().toISOString(),
      },
    };
  } catch (error) {
    console.error('Error getting file info:', error);
    return { success: false, error: 'Failed to get file info' };
  }
}
