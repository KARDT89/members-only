import { configDotenv } from "dotenv";
import {Pool} from "pg";
configDotenv()

const pool = new Pool({
    // connectionString: "postgresql://dt89:pg123@localhost:5432/members_only"
    connectionString: process.env.DATABASE_URL

});

export default pool;
