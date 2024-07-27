function beli(produk, harga) {
	localStorage.removeItem('selectedProduk');
    localStorage.setItem('selectedProduk', JSON.stringify({ produk, harga }));
    window.location.href = 'transaksi.html';
}

function submitTransaksi() {
    const nama = document.getElementById('nama').value;
    const alamat = document.getElementById('alamat').value;
    const produk = document.getElementById('produk').value;
    const jumlah = document.getElementById('jumlah').value;
	
	localStorage.removeItem('transaksiData');
    const transaksiData = {
        nama,
        alamat,
        produk,
        jumlah,
        total: jumlah * JSON.parse(localStorage.getItem('selectedProduk')).harga
    };

    localStorage.setItem('transaksiData', JSON.stringify(transaksiData));
    window.location.href = 'invoice.html';
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('transaksi.html')) {
        const selectedProduk = JSON.parse(localStorage.getItem('selectedProduk'));
        if (selectedProduk) {
            document.getElementById('produk').value = selectedProduk.produk;
        }
    }

    if (window.location.pathname.endsWith('invoice.html')) {
        const transaksiData = JSON.parse(localStorage.getItem('transaksiData'));
        if (transaksiData) {
            const invoiceDiv = document.getElementById('invoice');
            invoiceDiv.innerHTML = `
                <p>Nama: ${transaksiData.nama}</p>
                <p>Alamat: ${transaksiData.alamat}</p>
                <p>Produk: ${transaksiData.produk}</p>
                <p>Jumlah: ${transaksiData.jumlah}</p>
                <p>Total: Rp ${transaksiData.total}</p>
            `;
        }
    }
});
