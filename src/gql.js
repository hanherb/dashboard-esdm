let query = {
	allUser: `query getAllUser {
      users {
        _id
        fullname
        email
        role
        status
        authority
        badan_usaha
        izin
        generasi
        tahapan_kegiatan
        komoditas
        alamat_kantor
        telepon
        fax
        website
        npwp
        lokasi_tambang
        siup
        tdp
        skt_minerba
        profile_picture
      }
    }`,

	singleUser: `query getSingleUser($userId: String!) {
      user(_id: $userId) {
        _id
        fullname
        email
        role
        status
        authority
        badan_usaha
        izin
        generasi
        tahapan_kegiatan
        komoditas
        alamat_kantor
        telepon
        fax
        website
        npwp
        lokasi_tambang
        siup
        tdp
        skt_minerba
        profile_picture
      }
    }`,

    addUser: `mutation createSingleUser($input:PersonInput) {
          createUser(input: $input) {
              fullname
          }
  	}`,

  	updateUser: `mutation updateSingleUser($userEmail:String!, $input:PersonInput) {
          updateUser(email: $userEmail, input: $input) {
              fullname
          }
  	}`,

  	deleteUser: `mutation deleteSingleUser($userEmail:String!) {
	      deleteUser(email: $userEmail) {
	          fullname
	      }
  	}`,

    allCommerce: `query getAllItem {
	    commerces {
	      _id
	      name
	      price
        tkdn
	      qty
	      description
	      category
	      user
	      user_id
	      image
	    }
  	}`,

    singleCommerce: `query getSingleItem($itemId: String!) {
	    commerce(_id: $itemId) {
	      _id
	      name
	      price
        tkdn
	      qty
	      description
	      category
	      user
	      user_id
	      image
	    }
  	}`,

  	addCommerce: `mutation createSingleCommerce($input:CommerceInput) {
	      createCommerce(input: $input) {
	          name
	      }
  	}`,

  	updateCommerce: `mutation updateSingleCommerce($itemId: String!, $input:CommerceInput) {
          updateCommerce(_id: $itemId, input: $input) {
              name
          }
 	}`,

 	deleteCommerce: `mutation deleteSingleCommerce($itemId: String!) {
          deleteCommerce(_id: $itemId) {
              name
          }
  	}`,

  	allRole: `query getAllRole {
	    roles {
	        role_name
	    }
  	}`,

  	allPlugin: `query getAllPlugin {
        plugins {
          name
          status
        }
  	}`,

  	allAnggaranBelanja: `query getAllAnggaranBelanja {
      	anggaranBelanjas {
	        _id
	        kantor_penghasilan_karyawan
	  		kantor_kesejahteraan_karyawan
	  		kantor_komisi_penjualan
	  		kantor_pemeliharaan_kantor
	  		kantor_depresiasi_dan_amortisasi
	  		kantor_promosi_dan_publikasi
	  		kantor_sewa_alat
	  		kantor_pengiriman_barang_perjalanan_dan_komunikasi
	  		kantor_konsultan
	  		kantor_keuangan
	  		kantor_umum_dan_administrasi
	  		kantor_pengembangan_masyarakat
	  		kantor_biaya_lain_lain
	  		site_penghasilan_karyawan
	  		site_pemeliharaan_kantor
	  		site_pengiriman_barang_perjalanan_dan_komunikasi
	  		site_umum_dan_administrasi
	  		site_biaya_analisa_mineral_logam
	  		site_biaya_lain_lain
	  		bangunan
	  		sarana_dan_prasarana
	  		mesin
	  		peralatan
	  		kendaraan_dan_angkutan
	  		peralatan_eksplorasi
	  		kapal
	  		alat_alat_perabotan
	  		status_dan_tahun
	  		upload_by
	  		tahapan_kegiatan
      	}
    }`,
}

export default query;
