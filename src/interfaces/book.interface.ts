export interface BookInterface {         
title: string;
author: string;     
genre: 'FICTION' | 'NON-FICTION' | 'SCIENCE' | 'HISTORY' | 'FANTASY';
isbn: string;
description?: string;
copies: number;
available?: boolean;
createdAt?: Date;
updatedAt?: Date;
}