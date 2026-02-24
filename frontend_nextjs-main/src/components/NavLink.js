'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

export const NavLink = ({ className, activeClassName, to, children, ...props }) => {
    return (
        <Link
            href={to}
            className={cn(className, activeClassName)}
            {...props}
        >
            {children}
        </Link>
    );
};
