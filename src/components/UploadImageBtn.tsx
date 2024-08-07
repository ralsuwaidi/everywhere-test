import { Alert, AlertActions, AlertDescription, AlertTitle } from '@/components/catalyst/alert'
import { Button } from '@/components/catalyst/button'
import { useState } from 'react'
import { uploadVillaImages } from '@/lib/api'
import { PlusIcon } from '@heroicons/react/16/solid'

function UploadImageBtn({ slug }: { slug: string }) {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [uploadStatus, setUploadStatus] = useState('')

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0])
        }
    }

    const handleUpload = async () => {
        if (selectedFile) {
            try {
                const response = await uploadVillaImages(slug, selectedFile)
                console.log(response)
                setUploadStatus('Image uploaded successfully!')
            } catch (error) {
                setUploadStatus('Failed to upload image.')
            }
            setIsOpen(false)
        }
    }

    return (
        <>
            <Button type="button" onClick={() => setIsOpen(true)}>
                <PlusIcon />
                Add Image
            </Button>
            <Alert open={isOpen} onClose={() => setIsOpen(false)}>
                <AlertTitle>Upload Image</AlertTitle>
                <AlertDescription>
                    Please select an image to upload.
                </AlertDescription>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <AlertActions>
                    <Button plain onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleUpload}>Upload</Button>
                </AlertActions>
            </Alert>
            {uploadStatus && <p>{uploadStatus}</p>}
        </>
    )
}

export default UploadImageBtn
