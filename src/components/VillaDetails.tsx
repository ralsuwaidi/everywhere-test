interface VillaProps {
    villa: {
        name: string;
        description: string;
        // Add other villa properties here
    };
}

const VillaDetails: React.FC<VillaProps> = ({ villa }) => (
    <>
        <h1>{villa.name}</h1>
        <p>{villa.description}</p>
        {/* Render other villa details */}
    </>
);

export default VillaDetails;
