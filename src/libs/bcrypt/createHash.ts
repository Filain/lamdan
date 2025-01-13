import bcrypt from 'bcrypt';

import { config } from '../../config/config';

const createHash = async (password: string) => {
    const salt = await bcrypt.genSalt(config.bcryptSaltRounds);
    return await bcrypt.hash(password, salt);
};

export default createHash;
