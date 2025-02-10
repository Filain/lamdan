import bcrypt from 'bcrypt';

const validateHash = async (
    candidate: string,
    hash: string,
): Promise<boolean> => {
    return await bcrypt.compare(candidate, hash);
};

export default validateHash;
