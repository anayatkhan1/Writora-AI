import { Icons } from "@/components/global";
import { cn } from "@/utils";

interface Props {
	variant?: "icon" | "text" | "full";
	className?: string;
}

const Logo = ({ variant = "icon", className }: Props) => {
	return (
		<>
			{variant === "icon" ? (
				<Icons.logo className={cn("h-8 w-8 transition-all", className)} />
			) : variant === "text" ? (
				<Icons.wordmark
					className={cn("h-5 w-auto transition-all", className)}
				/>
			) : (
				<div
					className={cn(
						"flex h-8 w-auto items-center space-x-2 transition-all",
						className,
					)}
				>
					<Icons.logo className="h-8 w-8 transition-all" />
					<Icons.wordmark className="h-5 w-auto transition-all" />
				</div>
			)}
		</>
	);
};

export default Logo;
