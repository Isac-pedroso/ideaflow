

export const requestPrivado = async (url, dados, type) => {
    if (type === "GET") {
        const response = await fetch(url, {
            method: type,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })

        const body = await response.json();

        if (!response.ok) return { status: false, body: "" };

        return { status: true, body: body };
    }

    if(type === "POST"){
        const response = await fetch(url, {
            method: type,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(dados)
        })

        const body = await response.json();

        if (!response.ok) return { status: false, body: "" };

        return { status: true, body: body };
    }
    if(type === "PUT"){
        const response = await fetch(url, {
            method: type,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(dados)
        })

        const body = await response.json();

        if (!response.ok) return { status: false, body: "" };

        return { status: true, body: body };
    }

};