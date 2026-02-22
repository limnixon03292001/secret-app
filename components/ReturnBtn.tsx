import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { motion } from "framer-motion";

interface ReturnBtnProps {
  href: string;
  label: string;
}

export default function ReturnBtn({ href, label }: ReturnBtnProps) {
  return (
    <>
      <motion.button
        whileHover={{
          scale: 1.02,
        }}
        whileTap={{
          scale: 0.98,
        }}
        type="submit"
        className="text-gray-400 text-sm leading-relaxed max-w-full  "
      >
        <Link href={href} className="flex items-center gap-1 underline">
          <ArrowLeftIcon size={"20px"} strokeWidth={"1px"} /> {label}
        </Link>
      </motion.button>
    </>
  );
}
